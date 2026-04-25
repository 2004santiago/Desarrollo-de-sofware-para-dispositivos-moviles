import type { ReactNode } from "react";
import { useHistory } from "react-router-dom";

type PageLayoutProps = {
  title: string;
  children: ReactNode;
  showBackButton?: boolean;
};

function PageLayout({ title, children, showBackButton = true }: PageLayoutProps) {
  const history = useHistory();

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <button
                type="button"
                onClick={() => history.push("/home")}
                className="inline-flex items-center rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-700"
              >
                Volver
              </button>
            )}
            <div>
              <p className="text-sm text-sky-300">Challenge 7</p>
              <h1 className="text-2xl font-semibold text-white">{title}</h1>
            </div>
          </div>
        </header>

        <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
          {children}
        </section>
      </div>
    </main>
  );
}

export default PageLayout;
