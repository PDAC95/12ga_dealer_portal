import { FC } from 'react';
import { Clock, Wrench, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import type { IPart, InstallationDifficulty } from '../types/product.types';

interface InstallationGuideProps {
  product: IPart;
}

const DIFFICULTY_CONFIG: Record<
  InstallationDifficulty,
  { color: string; bgColor: string; borderColor: string; icon: typeof CheckCircle }
> = {
  Easy: {
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    icon: CheckCircle,
  },
  Moderate: {
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    icon: AlertCircle,
  },
  Hard: {
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    icon: AlertTriangle,
  },
  Professional: {
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    icon: Wrench,
  },
};

export const InstallationGuide: FC<InstallationGuideProps> = ({ product }) => {
  const { installation, diyGuide } = product;

  if (!installation && !diyGuide) {
    return (
      <div className="text-center py-8 text-muted">
        <Wrench className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>No installation information available.</p>
      </div>
    );
  }

  const difficulty = installation?.difficulty || diyGuide?.difficulty;
  const difficultyConfig = difficulty ? DIFFICULTY_CONFIG[difficulty] : null;
  const DifficultyIcon = difficultyConfig?.icon;

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      {installation && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Difficulty */}
          {difficulty && difficultyConfig && DifficultyIcon && (
            <div
              className={`p-4 rounded-xl border ${difficultyConfig.bgColor} ${difficultyConfig.borderColor}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <DifficultyIcon className={`w-4 h-4 ${difficultyConfig.color}`} />
                <span className="text-xs text-muted uppercase tracking-wider">Difficulty</span>
              </div>
              <span className={`text-lg font-semibold ${difficultyConfig.color}`}>
                {difficulty}
              </span>
            </div>
          )}

          {/* Estimated Time */}
          {installation.estimatedTime && (
            <div className="p-4 rounded-xl border bg-surface border-gray-800">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-muted" />
                <span className="text-xs text-muted uppercase tracking-wider">Est. Time</span>
              </div>
              <span className="text-lg font-semibold text-white">
                {installation.estimatedTime}
              </span>
            </div>
          )}

          {/* Professional Recommended */}
          {installation.professionalRecommended && (
            <div className="p-4 rounded-xl border bg-orange-500/10 border-orange-500/20">
              <div className="flex items-center gap-2 mb-1">
                <Wrench className="w-4 h-4 text-orange-400" />
                <span className="text-xs text-muted uppercase tracking-wider">Recommendation</span>
              </div>
              <span className="text-lg font-semibold text-orange-400">
                Professional Install
              </span>
            </div>
          )}
        </div>
      )}

      {/* Special Notes */}
      {installation?.specialNotes && (
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
          <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-primary" />
            Special Notes
          </h3>
          <p className="text-sm text-muted">{installation.specialNotes}</p>
        </div>
      )}

      {/* DIY Guide */}
      {diyGuide && (
        <div className="space-y-4">
          {/* Tools Required */}
          {diyGuide.tools && diyGuide.tools.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                Tools Required
              </h3>
              <ul className="space-y-2">
                {diyGuide.tools.map((tool, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted">
                    <Wrench className="w-4 h-4 text-primary shrink-0" />
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Preparation Steps */}
          {diyGuide.preparation && diyGuide.preparation.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                Preparation
              </h3>
              <ol className="space-y-2">
                {diyGuide.preparation.map((step, index) => (
                  <li key={index} className="flex gap-3 text-sm">
                    <span className="w-6 h-6 bg-surface border border-gray-800 rounded-full flex items-center justify-center text-muted shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-muted pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Mounting Steps */}
          {diyGuide.mountingSteps && diyGuide.mountingSteps.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                Installation Steps
              </h3>
              <ol className="space-y-2">
                {diyGuide.mountingSteps.map((step, index) => (
                  <li key={index} className="flex gap-3 text-sm">
                    <span className="w-6 h-6 bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center text-primary shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-muted pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Final Check */}
          {diyGuide.finalCheck && diyGuide.finalCheck.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                Final Checks
              </h3>
              <ul className="space-y-2">
                {diyGuide.finalCheck.map((check, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted">
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                    {check}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
