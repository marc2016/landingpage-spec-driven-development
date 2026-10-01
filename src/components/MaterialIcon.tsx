import { FC } from 'react';

interface MaterialIconProps {
  name: string;
  className?: string;
  size?: number | string;
}

export const MaterialIcon: FC<MaterialIconProps> = ({ name, className = '', size }) => {
  return (
    <span
      className={`material-symbols-outlined select-none inline-flex items-center justify-center leading-none ${className}`}
      style={size ? { fontSize: typeof size === 'number' ? `${size}px` : size } : undefined}
      aria-hidden="true"
    >
      {name}
    </span>
  );
};
