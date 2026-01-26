import { forwardRef, InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';

type RememberMeCheckboxProps = InputHTMLAttributes<HTMLInputElement>;

export const RememberMeCheckbox = forwardRef<
  HTMLInputElement,
  RememberMeCheckboxProps
>(({ ...props }, ref) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div className="relative">
        <input
          ref={ref}
          type="checkbox"
          className="peer sr-only"
          {...props}
        />
        <div className="w-5 h-5 border-2 border-gray-600 rounded bg-surface peer-checked:bg-primary peer-checked:border-primary transition-colors flex items-center justify-center">
          <Check className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
      </div>
      <span className="text-sm text-muted group-hover:text-white transition-colors select-none">
        Recordarme por 30 días
      </span>
    </label>
  );
});

RememberMeCheckbox.displayName = 'RememberMeCheckbox';
