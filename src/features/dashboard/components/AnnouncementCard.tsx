import { FC } from 'react';
import { Megaphone, Sparkles, RefreshCw, AlertTriangle, ChevronRight } from 'lucide-react';

type AnnouncementType = 'info' | 'promo' | 'update' | 'urgent';

interface AnnouncementCardProps {
  title: string;
  content: string;
  date: string;
  isNew?: boolean;
  type?: AnnouncementType;
}

const typeConfig: Record<AnnouncementType, {
  icon: FC<{ className?: string }>;
  gradient: string;
  iconBg: string;
}> = {
  info: {
    icon: Megaphone,
    gradient: 'from-primary/20 via-primary/5 to-transparent',
    iconBg: 'bg-primary'
  },
  promo: {
    icon: Sparkles,
    gradient: 'from-amber-500/20 via-amber-500/5 to-transparent',
    iconBg: 'bg-amber-500'
  },
  update: {
    icon: RefreshCw,
    gradient: 'from-blue-500/20 via-blue-500/5 to-transparent',
    iconBg: 'bg-blue-500'
  },
  urgent: {
    icon: AlertTriangle,
    gradient: 'from-red-600/30 via-red-600/10 to-transparent',
    iconBg: 'bg-red-600'
  },
};

export const AnnouncementCard: FC<AnnouncementCardProps> = ({
  title,
  content,
  date,
  isNew = false,
  type = 'info',
}) => {
  const { icon: Icon, gradient, iconBg } = typeConfig[type];

  return (
    <div className="group relative bg-surface/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-surface transition-all duration-300 cursor-pointer">
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-60`} />

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/10 to-transparent" />

      {/* Content */}
      <div className="relative p-5">
        <div className="flex gap-4">
          {/* Icon container */}
          <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center shrink-0 shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            {/* Header with title and badges */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-semibold text-white line-clamp-1">
                    {title}
                  </h3>
                  {isNew && (
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary text-white rounded-full animate-pulse">
                      New
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/40 mt-1">
                  {date}
                </p>
              </div>

              {/* Arrow indicator */}
              <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 shrink-0 mt-1" />
            </div>

            {/* Description */}
            <p className="text-sm text-white/60 mt-2 line-clamp-2 leading-relaxed">
              {content}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom accent line on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  );
};
