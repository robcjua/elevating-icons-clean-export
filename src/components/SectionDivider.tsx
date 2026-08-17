export default function SectionDivider() {
  return (
    <div className="relative bg-[#0D0D0D] py-6 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#FFC300]" />
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rotate-45 bg-[#FFC300]" />
            <span
              style={{ fontFamily: "'Oswald', sans-serif" }}
              className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-[#FFC300] whitespace-nowrap"
            >
              Elevating Icons
            </span>
            <div className="w-2 h-2 rotate-45 bg-[#FFC300]" />
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#FFC300]" />
        </div>
      </div>
    </div>
  );
}
