import React, { useState } from 'react';
import { VOCABULARIO_COMPLETO } from '../dados/exercicios-28dias';

export const TabBiblioteca: React.FC = () => {
  const [filteredCategory, setFilteredCategory] = useState<string | null>(null);

  const categories = [...new Set(VOCABULARIO_COMPLETO.map(v => v.cat))];
  const filteredVocab = filteredCategory 
    ? VOCABULARIO_COMPLETO.filter(v => v.cat === filteredCategory)
    : VOCABULARIO_COMPLETO;

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-MX';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📚 Biblioteca</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Filtrar por Categoria</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <button 
            onClick={() => setFilteredCategory(null)}
            style={{
              padding: '8px 16px',
              backgroundColor: filteredCategory === null ? '#006847' : '#ddd',
              color: filteredCategory === null ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Todas
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilteredCategory(cat)}
              style={{
                padding: '8px 16px',
                backgroundColor: filteredCategory === cat ? '#006847' : '#ddd',
                color: filteredCategory === cat ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '15px'
      }}>
        {filteredVocab.map((item, idx) => (
          <div
            key={idx}
            style={{
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9'
            }}
          >
            <div style={{ marginBottom: '10px' }}>
              <h4 style={{ margin: '0 0 5px 0' }}>{item.es}</h4>
              <p style={{ margin: '0', fontSize: '0.9em', color: '#666' }}>{item.pt}</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '0.85em', color: '#999' }}>{item.cat}</p>
            </div>

            <p style={{ margin: '10px 0', fontSize: '0.9em', fontStyle: 'italic', color: '#555' }}>
              "{item.exemplo}"
            </p>

            <button
              onClick={() => playAudio(item.es)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#006847',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              🔊 Ouvir Pronúncia
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <p><strong>Total de palavras:</strong> {filteredVocab.length}</p>
        <p><strong>Categorias:</strong> {categories.length}</p>
      </div>
    </div>
  );
};
