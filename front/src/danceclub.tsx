import { useEffect, useRef, useState, type CSSProperties } from 'react';

interface DanceClubProps {
  onBack: () => void;
}

const personagens = [
  {
    id: 1,
    nome: 'thom_yorke',
    img: '/penguindance1.gif',
    x: '31%',
    y: '68%',
    fala: "im not here, this isn't happening???",
    size: 105,
  },
  {
    id: 2,
    nome: 'erispsycho',
    img: '/penguindance2.gif',
    x: '50%',
    y: '72%',
    fala: 'ola pessoal boa noite',
    size: 112,
    speechOffset: '-24px',
  },
  {
    id: 3,
    nome: 'ritaduvall67',
    img: '/penguindance3.gif',
    x: '68%',
    y: '67%',
    fala: 'vc quer saber a lista de presentes? clica em mim aff',
    size: 90,
    link: 'https://br.pinterest.com/erispyscho/club-elle/',
  },
];

export default function DanceClub({ onBack }: DanceClubProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [precisaInteracao, setPrecisaInteracao] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;
    audio.loop = true;

    audio.play().catch(() => {
      setPrecisaInteracao(true);
    });
  }, []);

  function tocarSom() {
    const audio = audioRef.current;
    if (!audio) return;

    audio
      .play()
      .then(() => setPrecisaInteracao(false))
      .catch(() => setPrecisaInteracao(true));
  }

  return (
    <div style={styles.page}>
      <main style={styles.screen} onClick={tocarSom}>
        <audio ref={audioRef} src="/danceclub.mp3" loop />

        <img src="/danceclub.png" style={styles.bg} alt="" />

        <button
          style={styles.backBtn}
          onClick={(e) => {
            e.stopPropagation();
            onBack();
          }}
        >
          voltar
        </button>

        {personagens.map((p) => (
          <div
            key={p.id}
            style={{
                ...styles.character,
                 left: p.x,
                top: p.y,
                width: `clamp(${p.size * 0.45}px, ${p.size / 10}vw, ${p.size}px)`,
                cursor: p.link ? 'pointer' : 'default',
              }}

            onClick={(e) => {
                e.stopPropagation();

                if (p.link) {
                window.open(p.link, '_blank', 'noopener,noreferrer');
                } else {
                tocarSom();
                }
            }}
            >
            <div style={{
                ...styles.speech,
                bottom: p.speechOffset
                ? `calc(100% + 8px + ${p.speechOffset})`
                : 'calc(100% + 8px)'
            }}>{p.fala}</div>

            <img src={p.img} style={styles.characterImg} alt="" />

            <div style={styles.nameTag}>{p.nome}</div>
          </div>
        ))}

        {precisaInteracao && (
          <button
            style={styles.soundBtn}
            onClick={(e) => {
              e.stopPropagation();
              tocarSom();
            }}
          >
            tocar música
          </button>
        )}

        <img src="/toolbar.png" style={styles.toolbar} alt="" />
      </main>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: '100dvh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    boxSizing: 'border-box',
    background: 'radial-gradient(circle at center, #027fcc 0%, #00529b 100%)',
    overflow: 'hidden',
  },

  screen: {
    position: 'relative',
    width: 'min(100%, 1050px)',
    aspectRatio: '16 / 9',
    maxHeight: 'calc(100dvh - 24px)',
    overflow: 'hidden',
    border: '5px solid #06365f',
    borderRadius: '24px',
    backgroundColor: '#032d54',
    boxShadow: '0 10px 0 #02243f, 0 20px 30px rgba(0,0,0,.35)',
  },

  bg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    pointerEvents: 'none',
    userSelect: 'none',
  },

  backBtn: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 50,
    background: '#7ee84f',
    border: '2px solid #075083',
    borderRadius: '999px',
    padding: '5px 12px',
    fontFamily: 'Arial, sans-serif',
    fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
    fontWeight: 700,
    cursor: 'pointer',
    textTransform: 'lowercase',
  },

  character: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    zIndex: 20,
  },

  characterImg: {
    width: '100%',
    display: 'block',
    userSelect: 'none',
    filter: 'drop-shadow(3px 5px 0 rgba(0,0,0,.3))',
  },

  speech: {
    position: 'absolute',
    left: '50%',
    bottom: 'calc(100% + 8px)',
    transform: 'translateX(-50%)',
    minWidth: 'max-content',
    maxWidth: '170px',
    padding: '5px 9px',
    background: '#fff',
    border: '1px solid #777',
    borderRadius: '999px',
    fontFamily: 'Arial, sans-serif',
    fontSize: 'clamp(0.56rem, 1.6vw, 0.78rem)',
    fontWeight: 700,
    color: '#111',
    lineHeight: 1.1,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    boxShadow: '0 1px 2px rgba(0,0,0,.25)',
    zIndex: 45,
  },

  nameTag: {
    marginTop: '2px',
    fontFamily: 'Arial, sans-serif',
    fontSize: 'clamp(0.65rem, 1.8vw, 0.9rem)',
    fontWeight: 700,
    color: '#000',
    lineHeight: 1,
    textShadow: '0 1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff, 0 -1px 0 #fff',
    pointerEvents: 'none',
  },

  soundBtn: {
    position: 'absolute',
    right: '12px',
    bottom: '70px',
    zIndex: 60,
    background: '#ffcc00',
    border: '2px solid #082947',
    borderRadius: '10px',
    padding: '6px 12px',
    fontFamily: 'Arial, sans-serif',
    fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
    fontWeight: 700,
    cursor: 'pointer',
  },

  toolbar: {
    position: 'absolute',
    left: '50%',
    bottom: 0,
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '800px',
    zIndex: 35,
    pointerEvents: 'none',
    userSelect: 'none',
  },
};