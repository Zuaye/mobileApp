"use client";

interface AdminContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function AdminContainer({
  children,
  className = "",
}: AdminContainerProps) {
  return (
    <div
      className={`
      rounded-2xl 
      bg-white/60 dark:bg-gray-800/60 
      backdrop-blur-lg 
      shadow-lg
      border border-gray-100 dark:border-gray-700
      p-6
      ${className}
    `}
    >
      {children}
    </div>
  );
}
