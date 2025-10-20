import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
}

export const GlassCard = ({ children, className = '', ...props }: GlassCardProps) => {
  return (
    <motion.div
      className={`
        backdrop-blur-xl bg-white/10 
        border border-white/20 
        rounded-2xl shadow-2xl
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};
