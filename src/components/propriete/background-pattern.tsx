export function BackgroundPattern() {
  return (
    <div className="absolute inset-0 opacity-5 -z-0">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="congoPattern"
            patternUnits="userSpaceOnUse"
            width="60"
            height="60"
            patternTransform="rotate(45)"
          >
            <rect width="60" height="60" fill="none" />
            <path
              d="M0 0L30 30L60 0M0 60L30 30L60 60"
              stroke="#f39200"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="30"
              cy="30"
              r="10"
              fill="none"
              stroke="#f39200"
              strokeWidth="2"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#congoPattern)" />
      </svg>
    </div>
  );
}
