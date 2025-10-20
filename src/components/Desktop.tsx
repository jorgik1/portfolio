interface DesktopProps {
  onAppOpen: (appId: string) => void;
}

const Desktop = ({ }: DesktopProps) => {
  // Desktop can have desktop icons if needed
  // For now, we'll keep it clean with just the background

  return (
    <div className="absolute inset-0 pt-16 pb-24">
      {/* Desktop area - can add desktop icons here if needed */}
    </div>
  );
};

export default Desktop;
