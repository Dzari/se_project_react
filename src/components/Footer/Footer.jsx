export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#492828]/10 bg-[#ECECEC]">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-[#492828]/80">
          Developed by <span className="text-[#492828]">Darien Sessions</span>
        </p>

        <p className="text-xs tracking-wide text-[#492828]/60">{year}</p>
      </div>
    </footer>
  );
}
