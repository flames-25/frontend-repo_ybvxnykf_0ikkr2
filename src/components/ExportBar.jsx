import { Printer } from 'lucide-react';

export default function ExportBar({ title, panels, columns }) {
  const openPrintView = () => {
    const colClass = columns === 1 ? 'grid-template-columns: 1fr;' : columns === 2 ? 'grid-template-columns: 1fr 1fr;' : columns === 3 ? 'grid-template-columns: 1fr 1fr 1fr;' : 'grid-template-columns: 1fr 1fr 1fr 1fr;';

    const html = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>${title || 'comic'}</title>
          <style>
            :root { --border: #000; --bg: #fff; }
            body { margin: 0; padding: 24px; background: var(--bg); font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Noto Sans, 'Apple Color Emoji','Segoe UI Emoji'; color: #0f172a; }
            .wrap { max-width: 1200px; margin: 0 auto; }
            .title { font-weight: 800; font-size: 28px; margin: 0 0 16px; }
            .grid { display: grid; gap: 16px; ${colClass} }
            .panel { aspect-ratio: 3 / 4; border: 2px solid var(--border); border-radius: 10px; display: flex; flex-direction: column; overflow: hidden; }
            .char { flex: 1; display: flex; align-items: center; justify-content: center; font-size: 64px; }
            .bubble { margin: 12px; display: inline-block; background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 8px 10px; font-size: 14px; max-width: 90%; box-shadow: 0 1px 2px rgba(0,0,0,.05); }
            @media print { body { padding: 0; } .wrap { max-width: none; } }
          </style>
        </head>
        <body>
          <div class="wrap">
            <div class="title">${title || ''}</div>
            <div class="grid">
              ${panels
                .map(
                  (p) => `
                  <div class="panel" style="background:${p.bgColor}">
                    <div class="char">${p.character || ''}</div>
                    <div class="bubble">${(p.text || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
                  </div>`
                )
                .join('')}
            </div>
          </div>
          <script>window.onload = () => { setTimeout(() => window.print(), 250); };</script>
        </body>
      </html>`;

    const w = window.open('', '_blank', 'noopener');
    if (!w) return;
    w.document.open();
    w.document.write(html);
    w.document.close();
  };

  return (
    <section className="rounded-xl bg-white/70 backdrop-blur border border-slate-200 shadow-sm p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm text-slate-600">Open a clean print view. You can save as PDF or take a screenshot for PNG.</div>
        <button
          onClick={openPrintView}
          className="inline-flex items-center gap-2 rounded-md bg-emerald-600 text-white px-4 py-2 text-sm hover:bg-emerald-500"
          title="Open print view"
        >
          <Printer className="w-4 h-4" /> Print / Save
        </button>
      </div>
    </section>
  );
}
