import React from 'react';
import { WorkshopTask } from '../data/workshopTasks';
import { MaterialIcon } from './MaterialIcon';

interface TaskTickerCardProps {
  task: WorkshopTask;
  onClick: (task: WorkshopTask) => void;
  isSpotlight?: boolean;
}

export const TaskTickerCard: React.FC<TaskTickerCardProps> = ({ task, onClick, isSpotlight = false }) => {
  return (
    <div
      onClick={() => onClick(task)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(task);
        }
      }}
      className={`group relative text-left bg-white rounded-2xl p-5 transition-all duration-300 cursor-pointer select-none
        ${task.badgeColor.border} border-2
        shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06),0_2px_6px_-2px_rgba(0,0,0,0.03)]
        hover:shadow-[0_12px_30px_-6px_rgba(0,0,0,0.12)] hover:-translate-y-1
        hover:border-zinc-800/40
        ${isSpotlight ? 'ring-4 ring-zinc-900/10' : ''}
      `}
    >
      {/* Top Meta: Number & Difficulty Badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="font-mono text-xs font-bold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-md">
          #{task.number < 10 ? `0${task.number}` : task.number}
        </span>

        <div className="flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${task.badgeColor.bgBadge} ${task.badgeColor.textBadge} border ${task.badgeColor.borderBadge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${task.badgeColor.accentDot}`} />
            {task.difficultyLabel}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-bold text-zinc-900 text-base leading-snug mb-2 group-hover:text-black transition-colors flex items-start gap-2">
        <MaterialIcon name={task.icon} className="text-lg text-zinc-600 group-hover:text-zinc-800 transition-colors shrink-0 mt-0.5" />
        <span>{task.title}</span>
      </h3>

      {/* Objective Preview */}
      <p className="text-zinc-600 text-xs leading-relaxed line-clamp-2 mb-3">
        {task.goal}
      </p>

      {/* Footer Tags & Hint */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
        <div className="flex items-center gap-1 flex-wrap">
          {task.tags.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="text-[10px] font-medium text-zinc-700 bg-zinc-100/90 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <span className="text-[11px] text-zinc-500 font-medium group-hover:text-zinc-900 group-hover:translate-x-0.5 transition-all flex items-center gap-0.5">
          Details
          <MaterialIcon name="arrow_forward" className="text-xs" />
        </span>
      </div>
    </div>
  );
};
