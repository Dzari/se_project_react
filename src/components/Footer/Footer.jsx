export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#ECECEC]/10 bg-[#492828]">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-[#ECECEC]/80">
          Developed by <span className="text-[#ECECEC]">Darien Sessions</span>
        </p>

        <p className="text-xs tracking-wide text-[#ECECEC]/60">{year}</p>
      </div>
    </footer>
  );
}
