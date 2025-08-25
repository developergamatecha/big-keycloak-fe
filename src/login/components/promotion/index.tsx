export function Promotion() {
  return (
    <div className="relative flex items-center justify-center w-full overflow-hidden bg-gradient-primary">
      <div className="relative flex flex-col items-center justify-center w-full p-8 space-y-8 text-white lg:p-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-0.5 bg-white/20 transform -rotate-45"></div>
          <div className="absolute top-20 left-20 w-24 h-0.5 bg-white/15 transform rotate-45"></div>
          <div className="absolute top-32 right-16 w-40 h-0.5 bg-white/20 transform -rotate-12"></div>
          <div className="absolute bottom-32 left-8 w-28 h-0.5 bg-white/15 transform rotate-30"></div>
          <div className="absolute bottom-20 right-12 w-36 h-0.5 bg-white/20 transform -rotate-45"></div>
          <div className="absolute top-1/2 left-4 w-20 h-0.5 bg-white/10 transform rotate-90"></div>
          <div className="absolute top-1/3 right-8 w-24 h-0.5 bg-white/15 transform -rotate-30"></div>
          <div className="absolute bottom-1/3 left-1/4 w-32 h-0.5 bg-white/10 transform rotate-15"></div>
        </div>

        <div className="relative z-10 w-full max-w-2xl min-h-[545.5px]">
          <div className="relative w-full">{/* Carousel Here */}</div>
        </div>
      </div>

      <div className="absolute top-0 right-0 transform translate-x-32 -translate-y-32 rounded-full w-96 h-96 bg-white/5 blur-3xl"></div>

      <div className="absolute bottom-0 left-0 transform -translate-x-32 translate-y-32 rounded-full w-96 h-96 bg-white/5 blur-3xl"></div>
    </div>
  );
}
