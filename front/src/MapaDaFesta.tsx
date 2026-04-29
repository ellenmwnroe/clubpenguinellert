import { useState } from 'react';

// O mapa de base (image_6.png) deve estar em public/mapa_completo.png

interface MapaDaFestaProps {
  onClose: () => void;
  pinguimName: string;
}

// Configuração dos locais clicáveis
const LOCAIS = [
  { 
    id: 'ponto_encontro', 
    nome: 'salão jardins', 
    top: '55%', left: '46%', 
    info: 'festa aqui! salão de festas do jardins às 20h30. não te atrasa!', 
    icon: '/ícone_farol.png' 
  },
  { 
    id: 'mimos', 
    nome: 'mimos', 
    top: '45%', left: '60%', 
    info: 'vê minha wishlist no pinterest (já traga no inventário)', 
    icon: '/ícone_sacola.png' 
  },
  { 
    id: 'iglu_ellen', 
    nome: 'iglu da ellen', 
    top: '70%', left: '50%', 
    info: 'bem-vindo ao nível 20, {pinguimName}!', 
    icon: '/ícone_info.png' 
  },
  { 
    id: 'dojo', 
    nome: 'dojo ninja', 
    top: '25%', left: '62%', 
    info: 'apenas puffles confirmados passam por aqui.', 
    icon: '/ícone_pin.png' 
  },
];

function MapaDaFesta({ onClose, pinguimName }: MapaDaFestaProps) {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const togglePopup = (id: string | null) => {
    setActivePopup(id);
  };

  return (
    <div style={styles.mapOverlay}>
      <div style={styles.mapContainer}>
        {/* Imagem do mapa de base */}
        <img src="/mapa_completo.png" alt="mapa da festa" style={styles.mapImage} />

        {/* Menu de UI (Superior Esquerdo) - Reaproveitado */}
        <div style={styles.uiMenu}>
          {/* Mapear os ícones do menu original para pop-ups */}
          <div onClick={() => togglePopup('info_geral')} style={styles.uiIcon}><img src="/ícone_farol.png" alt="lugares" style={styles.uiImg}/></div>
          <div onClick={() => alert('nível 20 de games!')} style={styles.uiIcon}><img src="/ícone_joystick.png" alt="jogos" style={styles.uiImg}/></div>
          <div onClick={() => alert('abrir pinterest...')} style={styles.uiIcon}><img src="/ícone_sacola.png" alt="lojas" style={styles.uiImg}/></div>
          <div onClick={() => alert('vê quem vem...')} style={styles.uiIcon}><img src="/ícone_puffle.png" alt="pets" style={styles.uiImg}/></div>
        </div>

        {/* Pins e Ícones nos locais (position absolute) */}
        {LOCAIS.map(local => (
          <div 
            key={local.id} 
            onClick={() => togglePopup(local.id)}
            style={{...styles.pin, top: local.top, left: local.left }}
          >
            <img src={local.icon} alt={local.nome} style={local.id === 'mimos' ? styles.presentIcon : styles.pinIcon} />
            <span style={styles.pinText}>{local.nome}</span>
          </div>
        ))}

        {/* Pop-up de Informações */}
        {activePopup && (
          <div style={styles.popup}>
            <button onClick={() => togglePopup(null)} style={styles.popupClose}>[x]</button>
            <p style={{ margin: 0, fontWeight: 'bold' }}>
              {LOCAIS.find(l => l.id === activePopup)?.info.replace('{pinguimName}', pinguimName) || 'informação indisponível'}
            </p>
          </div>
        )}
        
        {/* Botão de fechar (X) - Canto Superior Direito */}
        <button onClick={onClose} style={styles.closeButton}>x</button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  mapOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    fontFamily: 'sans-serif',
  },
  mapContainer: {
    position: 'relative',
    width: '1000px', // Proporção da imagem (pode precisar de ajuste)
    height: '633px', 
    background: '#fff',
    border: '10px solid #fff',
    borderRadius: '15px',
    boxShadow: '0 15px 30px rgba(0,0,0,0.5)',
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  uiMenu: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    display: 'flex',
    gap: '10px',
    background: 'rgba(255,255,255,0.7)',
    padding: '10px',
    borderRadius: '10px',
    zIndex: 10,
  },
  uiIcon: {
    cursor: 'pointer',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uiImg: {
    width: '100%',
    height: 'auto',
  },
  pin: {
    position: 'absolute',
    cursor: 'pointer',
    transform: 'translate(-50%, -100%)', // Centraliza o ícone no ponto
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 5,
  },
  pinIcon: {
    width: '30px',
    height: 'auto',
  },
  presentIcon: {
    width: '40px',
    height: 'auto',
  },
  pinText: {
    marginTop: '5px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: '#333',
    background: 'rgba(255,255,255,0.8)',
    padding: '2px 6px',
    borderRadius: '10px',
    border: '1px solid #ccc',
  },
  popup: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    width: '300px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    border: '3px solid #0054a6',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    zIndex: 10,
  },
  popupClose: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    color: '#0054a6',
    cursor: 'pointer',
    fontFamily: 'monospace',
  },
  closeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: '#d62828',
    color: '#fff',
    border: '2px solid #fff',
    borderRadius: '50%',
    width: '35px',
    height: '35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    cursor: 'pointer',
    zIndex: 10,
  },
};

export default MapaDaFesta;