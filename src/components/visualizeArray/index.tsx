import React, { useState } from 'react';

function ObjetoExpansivel({ objeto }: { objeto: any }) {
  const [expandido, setExpandido] = useState(false);

  const handleToggle = () => {
    setExpandido(!expandido);
  };

  return (
    <div>
      <div onClick={handleToggle} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
        Objeto
      </div>
      {expandido && (
        <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
          {Object.entries(objeto).map(([propriedade, valor]) => (
            <li key={propriedade}>
              {typeof valor === 'object' ? (
                <ObjetoExpansivel objeto={valor} />
              ) : (
                `${propriedade}: ${valor}`
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ArrayDeObjetos({ arrayDeObjetos }: { arrayDeObjetos: any[] }) {
  return (
    <div>
      {arrayDeObjetos.map((objeto, index) => (
        <ObjetoExpansivel key={index} objeto={objeto} />
      ))}
    </div>
  );
}

export default ArrayDeObjetos;
