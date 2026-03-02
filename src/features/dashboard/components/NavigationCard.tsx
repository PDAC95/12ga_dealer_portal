import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface NavigationCardProps {
  to: string;
  icon: ReactNode;
  title: string;
  description: string;
  badge?: string;
  disabled?: boolean;
}

export const NavigationCard: FC<NavigationCardProps> = ({
  to,
  icon,
  title,
  description,
  badge,
  disabled = false,
}) => {
  const content = (
    <div
      className={`
        relative bg-surface border border-gray-800 rounded-xl p-4
        transition-all duration-200
        ${disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:bg-surface-hover hover:border-gray-700 cursor-pointer group'
        }
      `}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-white truncate">
              {title}
            </h3>
            {badge && (
              <span className="px-2 py-0.5 text-xs font-medium bg-primary/20 text-primary rounded-full">
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-muted mt-1 line-clamp-2">
            {description}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted group-hover:text-white transition-colors shrink-0" />
      </div>
    </div>
  );

  if (disabled) {
    return content;
  }

  return (
    <Link to={to} className="block">
      {content}
    </Link>
  );
};
