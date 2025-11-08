import { useState } from 'react';
import Header from './components/Header.jsx';
import Controls from './components/Controls.jsx';
import ComicCanvas from './components/ComicCanvas.jsx';
import ExportBar from './components/ExportBar.jsx';

function App() {
  const [title, setTitle] = useState('My Comic');
  const [columns, setColumns] = useState(3);
  const [panels, setPanels] = useState([
    { id: 1, text: 'First panel!', bgColor: '#FDE68A', character: '😺', bubblePosition: 'top' },
    { id: 2, text: 'Make your own story...', bgColor: '#BFDBFE', character: '🦸‍♀️', bubblePosition: 'middle' },
    { id: 3, text: 'Then export as an image.', bgColor: '#C7D2FE', character: '🤖', bubblePosition: 'bottom' },
  ]);

  const addPanel = () => {
    const nextId = panels.length ? Math.max(...panels.map(p => p.id)) + 1 : 1;
    setPanels([
      ...panels,
      {
        id: nextId,
        text: 'New panel',
        bgColor: '#E9D5FF',
        character: '🐵',
        bubblePosition: 'middle',
      },
    ]);
  };

  const removeLastPanel = () => {
    if (panels.length === 0) return;
    setPanels(panels.slice(0, -1));
  };

  const updatePanel = (id, updates) => {
    setPanels(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };

  const clearPanels = () => setPanels([]);

  const setAllBackgrounds = (color) => {
    setPanels(prev => prev.map(p => ({ ...p, bgColor: color })));
  };

  const setAllCharacters = (emoji) => {
    setPanels(prev => prev.map(p => ({ ...p, character: emoji })));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <Header title={title} onTitleChange={setTitle} />
        <Controls
          columns={columns}
          onColumnsChange={setColumns}
          onAddPanel={addPanel}
          onRemoveLastPanel={removeLastPanel}
          onClearPanels={clearPanels}
          onSetAllBackgrounds={setAllBackgrounds}
          onSetAllCharacters={setAllCharacters}
        />
        <ComicCanvas
          title={title}
          panels={panels}
          columns={columns}
          onUpdatePanel={updatePanel}
        />
        <ExportBar title={title} panels={panels} columns={columns} />
      </div>
    </div>
  );
}

export default App;
