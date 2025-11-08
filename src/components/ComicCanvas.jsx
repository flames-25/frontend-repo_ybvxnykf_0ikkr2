import { useMemo } from 'react';

function SpeechBubble({ text, position = 'middle' }) {
  const trianglePosition = useMemo(() => {
    switch (position) {
      case 'top':
        return 'after:-top-2 after:left-6';
      case 'bottom':
        return 'after:-bottom-2 after:left-6';
      case 'left':
        return 'after:top-1/2 after:-left-2 -after-translate-x-1/2 after:-translate-y-1/2';
      case 'right':
        return 'after:top-1/2 after:-right-2 after:-translate-y-1/2';
      default:
        return 'after:top-1/2 after:left-6 after:-translate-y-1/2';
    }
  }, [position]);

  return (
    <div className={`relative max-w-[90%] rounded-lg bg-white px-3 py-2 text-sm shadow-sm border border-slate-200 after:content-[''] after:absolute after:w-0 after:h-0 after:border-8 after:border-transparent after:border-t-white ${trianglePosition}`}>
      <p className="leading-snug">{text}</p>
    </div>
  );
}

export default function ComicCanvas({ title, panels, columns, onUpdatePanel }) {
  const gridCols = useMemo(() => {
    const map = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' };
    return map[columns] || 'grid-cols-3';
  }, [columns]);

  return (
    <section className="rounded-xl bg-white border border-slate-200 shadow p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-lg">{title}</h2>
        <span className="text-xs text-slate-500">Drag to select text • Use emojis for quick characters</span>
      </div>
      <div className={`grid ${gridCols} gap-4`}>
        {panels.map((panel) => (
          <div
            key={panel.id}
            className="relative aspect-[3/4] overflow-hidden rounded-lg border-2 border-black bg-slate-100"
            style={{ backgroundColor: panel.bgColor }}
          >
            <div className="absolute inset-0 p-3 flex flex-col">
              <div className="flex-1 flex items-center justify-center text-6xl select-none">
                <span role="img" aria-label="character">{panel.character}</span>
              </div>
              <div className="mt-auto">
                <SpeechBubble text={panel.text} position={panel.bubblePosition} />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-black/5 backdrop-blur-sm p-2 flex items-center gap-2">
              <input
                type="text"
                value={panel.text}
                onChange={(e) => onUpdatePanel(panel.id, { text: e.target.value })}
                className="flex-1 rounded-md border border-slate-300 bg-white px-2 py-1 text-xs"
                placeholder="Panel text"
              />
              <input
                type="text"
                value={panel.character}
                onChange={(e) => onUpdatePanel(panel.id, { character: e.target.value })}
                className="w-16 rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-center"
                placeholder="😀"
              />
              <select
                value={panel.bubblePosition}
                onChange={(e) => onUpdatePanel(panel.id, { bubblePosition: e.target.value })}
                className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs"
              >
                <option value="top">Top</option>
                <option value="middle">Middle</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
              <input
                type="color"
                value={panel.bgColor}
                onChange={(e) => onUpdatePanel(panel.id, { bgColor: e.target.value })}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
