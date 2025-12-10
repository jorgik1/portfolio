import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'sidebar' | 'active-window';
}

export const GlassCard = ({ children, className = '', variant = 'default', ...props }: GlassCardProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'active-window':
        return 'backdrop-blur-2xl bg-white/15 border-white/30 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] dark:border-white/30 border-black/5';
      case 'sidebar':
        return 'backdrop-blur-md bg-black/20 border-white/5';
      default:
        return 'backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl';
    }
  };

  return (
    <motion.div
      className={`
        border
        rounded-2xl
        transition-all duration-300
        ${getVariantClasses()}
        ${className}
      `}
      {...props}
    >
      {/* Noise Texture Overlay for realism */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-2xl"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};
