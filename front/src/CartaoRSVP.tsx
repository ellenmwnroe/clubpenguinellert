import { type CSSProperties } from 'react';

interface CartaoRSVPProps {
  nome: string;
  cor: string;
  puffle: boolean;
  nomePuffle: string;
  onOpenMap: () => void;
}

export default function CartaoRSVP({
  nome,
  cor,
  puffle,
  nomePuffle,
  onOpenMap
}: CartaoRSVPProps) {
  return (
    <>
      <section className="rsvp-wrapper">
        <div style={styles.playerCard}>
          <img src="/cartadojogador.png" style={styles.cardBg} alt="" />

          <div style={styles.playerName}>
            {nome || 'pinguim'}
          </div>

          <div style={styles.penguinArea}>
            <img
              src={`/${cor}.png`}
              style={styles.penguin}
              alt="Pinguim"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </div>

        <aside style={styles.invitePanel}>
          <p style={styles.kicker}>rsvp do 20's da elle</p>

          <h1 style={styles.title}>
            apareceu uma festa no seu mapa
          </h1>

          <div style={styles.info}>
            <div style={styles.infoItem}>
              <small style={styles.label}>onde</small>
              <span style={styles.value}>salão do jardins de lombardia</span>
            </div>

            <div style={styles.infoItem}>
              <small style={styles.label}>quando</small>
              <span style={styles.value}>15 de maio · 20h30</span>
            </div>

            {puffle && (
              <div style={styles.infoItem}>
                <small style={styles.label}>puffle</small>
                <span style={styles.value}>
                  {nomePuffle || 'confirmado'}
                </span>
              </div>
            )}
          </div>

          <p style={styles.note}>
            vem arrumado pra dançar ou ate mesmo virar o iceberg rsss
          </p>

          <button onClick={onOpenMap} style={styles.button}>
            ir pro dance club da elle
          </button>
        </aside>
      </section>

      <style>{`
        .rsvp-wrapper {
          display: flex;
          gap: 24px;
          width: min(920px, calc(100vw - 32px));
          margin: 0 auto;
          padding: 24px;
          box-sizing: border-box;
          background: #0b78b8;
          border: 4px solid #064b82;
          border-radius: 28px;
          box-shadow: 0 8px 0 #053761, 0 18px 28px rgba(0,0,0,.28);
          font-family: "Burbank Big Condensed Black", Arial, sans-serif;
        }

        @media (max-width: 760px) {
          .rsvp-wrapper {
            flex-direction: column;
            align-items: center;
            gap: 18px;
            padding: 16px;
            border-radius: 22px;
          }
        }
      `}</style>
    </>
  );
}

const styles: Record<string, CSSProperties> = {
  playerCard: {
    position: 'relative',
    width: 'min(360px, 100%)',
    aspectRatio: '360 / 520',
    flexShrink: 0,
  },

  cardBg: {
    width: '100%',
    height: '100%',
    display: 'block',
    userSelect: 'none',
    pointerEvents: 'none',
  },

  playerName: {
  position: 'absolute',
  top: '55px',
  left:'190px',
  transform: 'translateX(-50%)',
  width: '68%',
  textAlign: 'center',
  fontSize: 'clamp(1.45rem, 5vw, 1.9rem)',
  color: '#111',
  lineHeight: 1,
  textTransform: 'lowercase',
  zIndex: 2,
  fontFamily: ' arial, sans-serif',
  fontWeight: 'bold',
},

  penguinArea: {
    position: 'absolute',
    left: '50%',
    top: '27%',
    transform: 'translateX(-50%)',
    width: '64%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  penguin: {
    width: '100%',
    height: 'auto',
    filter: 'drop-shadow(5px 7px 0 rgba(0,0,0,.28))',
  },

  invitePanel: {
    flex: 1,
    width: '100%',
    minHeight: 'auto',
    boxSizing: 'border-box',
    padding: 'clamp(24px, 5vw, 38px)',
    backgroundColor: '#fff3bb',
    border: '4px solid #102033',
    borderRadius: '24px',
    boxShadow: '5px 5px 0 #053761',
    color: '#102033',
  },

  kicker: {
    margin: '0 0 12px',
    color: '#0b78b8',
    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
    textTransform: 'lowercase',
  },

  title: {
    margin: '0 0 30px',
    maxWidth: '420px',
    fontSize: 'clamp(2.1rem, 7vw, 3rem)',
    lineHeight: 0.95,
    textTransform: 'lowercase',
  },

  info: {
    display: 'grid',
    gap: '18px',
    marginBottom: '28px',
  },

  infoItem: {
    display: 'grid',
    gap: '3px',
  },

  label: {
    color: '#0b78b8',
    fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
    lineHeight: 1,
    textTransform: 'lowercase',
  },

  value: {
    display: 'block',
    fontSize: 'clamp(1.25rem, 4.5vw, 1.55rem)',
    lineHeight: 1,
    textTransform: 'lowercase',
  },

  note: {
    margin: '0 0 28px',
    maxWidth: '420px',
    fontSize: 'clamp(1.15rem, 4vw, 1.35rem)',
    lineHeight: 1.08,
    color: '#23364d',
    textTransform: 'lowercase',
  },

  button: {
    width: '100%',
    padding: '15px 18px',
    backgroundColor: '#ffcc00',
    border: '4px solid #102033',
    borderRadius: '16px',
    boxShadow: '4px 5px 0 #102033',
    fontFamily: '"Burbank Big Condensed Black", Arial, sans-serif',
    fontSize: 'clamp(1.45rem, 5vw, 1.75rem)',
    color: '#102033',
    cursor: 'pointer',
    textTransform: 'lowercase',
  },
};