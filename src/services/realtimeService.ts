import { PostItItem } from '../data/mockData';

export interface SessionState {
  roomCode: string;
  activePhase: number;
  participantCount: number;
  serverConnected: boolean;
}

type PostItListener = (postIts: PostItItem[]) => void;
type SessionListener = (session: SessionState) => void;

class RealtimeService {
  private postIts: PostItItem[] = [];
  private sessionState: SessionState = {
    roomCode: 'VIBE',
    activePhase: 1,
    participantCount: 1,
    serverConnected: false,
  };
  private postItListeners: Set<PostItListener> = new Set();
  private sessionListeners: Set<SessionListener> = new Set();
  private eventSource: EventSource | null = null;
  private isCheckingServer = false;

  constructor() {
    this.loadFromLocalStorage();
    this.initConnection();
  }

  private loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem('openspec_postits');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Filter out legacy init- notes so dimensions start completely empty
          this.postIts = parsed.filter((p: any) => !p.id?.startsWith('init-'));
        }
      }
      const savedCode = localStorage.getItem('openspec_room_code');
      if (savedCode) {
        this.sessionState.roomCode = savedCode;
      }
    } catch {
      // Fallback
    }
  }

  private saveToLocalStorage() {
    try {
      localStorage.setItem('openspec_postits', JSON.stringify(this.postIts));
      localStorage.setItem('openspec_room_code', this.sessionState.roomCode);
    } catch {
      // Fallback
    }
  }

  public async initConnection() {
    if (this.isCheckingServer) return;
    this.isCheckingServer = true;

    try {
      const res = await fetch('/api/session', { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        this.sessionState = {
          roomCode: data.roomCode || 'VIBE',
          activePhase: data.activePhase || 1,
          participantCount: data.participantCount || 1,
          serverConnected: true,
        };
        this.notifySession();

        // Also fetch initial post-its from server
        const pRes = await fetch('/api/postits');
        if (pRes.ok) {
          const pData = await pRes.json();
          if (Array.isArray(pData) && pData.length > 0) {
            this.postIts = pData;
            this.notifyPostIts();
          }
        }

        this.setupEventSource();
      } else {
        this.sessionState.serverConnected = false;
        this.notifySession();
      }
    } catch {
      // Standalone mode / GitHub Pages
      this.sessionState.serverConnected = false;
      this.notifySession();
    } finally {
      this.isCheckingServer = false;
    }
  }

  private setupEventSource() {
    if (this.eventSource) {
      this.eventSource.close();
    }

    try {
      this.eventSource = new EventSource('/api/events');

      this.eventSource.onmessage = (e) => {
        try {
          const event = JSON.parse(e.data);
          if (event.type === 'init' || event.type === 'postits_update') {
            this.postIts = event.postIts;
            this.saveToLocalStorage();
            this.notifyPostIts();
          } else if (event.type === 'new_postit') {
            const exists = this.postIts.some((p) => p.id === event.postIt.id);
            if (!exists) {
              this.postIts = [event.postIt, ...this.postIts];
              this.saveToLocalStorage();
              this.notifyPostIts();
            }
          } else if (event.type === 'session_update') {
            this.sessionState = {
              ...this.sessionState,
              ...event.session,
              serverConnected: true,
            };
            this.notifySession();
          }
        } catch {
          // parse error
        }
      };

      this.eventSource.onerror = () => {
        this.sessionState.serverConnected = false;
        this.notifySession();
      };
    } catch {
      this.sessionState.serverConnected = false;
      this.notifySession();
    }
  }

  public subscribePostIts(listener: PostItListener): () => void {
    this.postItListeners.add(listener);
    listener(this.postIts);
    return () => this.postItListeners.delete(listener);
  }

  public subscribeSession(listener: SessionListener): () => void {
    this.sessionListeners.add(listener);
    listener(this.sessionState);
    return () => this.sessionListeners.delete(listener);
  }

  private notifyPostIts() {
    this.postItListeners.forEach((l) => l(this.postIts));
  }

  private notifySession() {
    this.sessionListeners.forEach((l) => l(this.sessionState));
  }

  public async addPostIt(postIt: Omit<PostItItem, 'id' | 'createdAt'>): Promise<PostItItem> {
    const newPostIt: PostItItem = {
      ...postIt,
      id: 'pi-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      createdAt: Date.now(),
    };

    // Optimistic update
    this.postIts = [newPostIt, ...this.postIts];
    this.saveToLocalStorage();
    this.notifyPostIts();

    if (this.sessionState.serverConnected) {
      try {
        await fetch('/api/postits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPostIt),
        });
      } catch {
        // local update stays
      }
    }

    return newPostIt;
  }

  public async deletePostIt(id: string) {
    this.postIts = this.postIts.filter((p) => p.id !== id);
    this.saveToLocalStorage();
    this.notifyPostIts();

    if (this.sessionState.serverConnected) {
      try {
        await fetch(`/api/postits/${encodeURIComponent(id)}`, { method: 'DELETE' });
      } catch {
        // ignore
      }
    }
  }

  public async updateActivePhase(phase: number) {
    this.sessionState.activePhase = phase;
    this.notifySession();

    if (this.sessionState.serverConnected) {
      try {
        await fetch('/api/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ activePhase: phase }),
        });
      } catch {
        // ignore
      }
    }
  }

  public async setRoomCode(code: string) {
    const cleaned = code.trim().toUpperCase() || 'VIBE';
    this.sessionState.roomCode = cleaned;
    this.saveToLocalStorage();
    this.notifySession();

    if (this.sessionState.serverConnected) {
      try {
        await fetch('/api/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ roomCode: cleaned }),
        });
      } catch {
        // ignore
      }
    }
  }

  public getPostIts(): PostItItem[] {
    return this.postIts;
  }

  public getSession(): SessionState {
    return this.sessionState;
  }
}

export const realtimeService = new RealtimeService();
