import { useState } from 'react';
import { Plus, Minus, Trash2, Palette, Smile } from 'lucide-react';

export default function Controls({
  columns,
  onColumnsChange,
  onAddPanel,
  onRemoveLastPanel,
  onClearPanels,
  onSetAllBackgrounds,
  onSetAllCharacters,
}) {
  const [bulkColor, setBulkColor] = useState('#FFF1F2');
  const [bulkEmoji, setBulkEmoji] = useState('😺');

  return (
    <section className="rounded-xl bg-white/70 backdrop-blur border border-slate-200 shadow-sm p-4 flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-slate-700">Columns</span>
        <input
          type="range"
          min={1}
          max={4}
          value={columns}
          onChange={(e) => onColumnsChange(Number(e.target.value))}
          className="w-40 accent-indigo-600"
        />
        <span className="text-sm tabular-nums w-6 text-center">{columns}</span>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={onAddPanel} className="inline-flex items-center gap-1 rounded-md bg-indigo-600 text-white px-3 py-2 text-sm hover:bg-indigo-500">
            <Plus className="w-4 h-4" /> Add panel
          </button>
          <button onClick={onRemoveLastPanel} className="inline-flex items-center gap-1 rounded-md bg-slate-800 text-white px-3 py-2 text-sm hover:bg-slate-700">
            <Minus className="w-4 h-4" /> Remove last
          </button>
          <button onClick={onClearPanels} className="inline-flex items-center gap-1 rounded-md bg-rose-600 text-white px-3 py-2 text-sm hover:bg-rose-500">
            <Trash2 className="w-4 h-4" /> Clear all
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-slate-700">Bulk style</span>
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-slate-500" />
          <input type="color" value={bulkColor} onChange={(e) => setBulkColor(e.target.value)} />
          <button
            onClick={() => onSetAllBackgrounds(bulkColor)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-50"
          >
            Apply to all
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Smile className="w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={bulkEmoji}
            onChange={(e) => setBulkEmoji(e.target.value)}
            className="w-20 rounded-md border border-slate-300 bg-white px-2 py-1 text-sm"
          />
          <button
            onClick={() => onSetAllCharacters(bulkEmoji || '🙂')}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-50"
          >
            Set characters
          </button>
        </div>
      </div>
    </section>
  );
}
