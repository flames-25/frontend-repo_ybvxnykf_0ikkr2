import { useId } from 'react';

export default function Header({ title, onTitleChange }) {
  const inputId = useId();
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Comic Maker</h1>
        <p className="text-slate-600">Craft quick comic strips with panels, speech bubbles, and emojis as characters.</p>
      </div>
      <div className="flex items-center gap-3">
        <label htmlFor={inputId} className="text-sm font-medium text-slate-700">Strip title</label>
        <input
          id={inputId}
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-56 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="My Comic"
        />
      </div>
    </header>
  );
}
