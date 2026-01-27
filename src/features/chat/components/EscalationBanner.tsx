import { FC } from 'react';
import { UserCheck, Loader2, Headphones, ArrowRight } from 'lucide-react';

interface EscalationBannerProps {
  isEscalating?: boolean;
  isEscalated?: boolean;
  onEscalate?: () => void;
}

export const EscalationBanner: FC<EscalationBannerProps> = ({
  isEscalating = false,
  isEscalated = false,
  onEscalate,
}) => {
  if (isEscalated) {
    return (
      <div className="mx-4 mb-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 p-4">
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5 animate-pulse" />

          <div className="relative flex items-center gap-4">
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
              <UserCheck className="w-6 h-6 text-white" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-green-400">
                  Connected to Support
                </h4>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/20 rounded-full">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-[10px] font-semibold text-green-400 uppercase">Live</span>
                </div>
              </div>
              <p className="text-xs text-green-400/60 mt-0.5">
                A support agent is now in the conversation
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!onEscalate) return null;

  return (
    <div className="mx-4 mb-4">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-white/[0.03] to-white/[0.06] border border-white/10 p-4 group hover:border-primary/30 transition-colors">
        <div className="flex items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-colors">
              <Headphones className="w-5 h-5 text-primary" />
            </div>

            {/* Content */}
            <div>
              <h4 className="text-sm font-semibold text-white">
                Need more help?
              </h4>
              <p className="text-xs text-white/40 mt-0.5">
                Talk to our support team directly
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onEscalate}
            disabled={isEscalating}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary rounded-xl text-sm font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isEscalating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <span>Talk to Human</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
