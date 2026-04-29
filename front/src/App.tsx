import { useEffect, useState, type CSSProperties } from 'react';
import axios from 'axios';
import CartaoRSVP from './CartaoRSVP';
import DanceClub from './danceclub';

type TelaAtiva = 'servidores' | 'login' | 'cartao' | 'danceclub';
type StatusServidor = 'open' | 'full';

type Servidor = {
  id: string;
  nome: string;
  status: StatusServidor;
  hasChat: boolean;
  ocupacao?: number;
};

// Cores originais em grid quadrado
const CORES_CP = [
  { nome: 'azul', hex: '#0054a6' },
  { nome: 'verde', hex: '#00923f' },
  { nome: 'rosa', hex: '#e4007e' },
  { nome: 'preto', hex: '#231f20' },
  { nome: 'roxo', hex: '#662d91' },
  { nome: 'laranja', hex: '#f7941d' },
];

const SERVIDORES: Servidor[] = [
  { id: 'geladeira', nome: 'Geladeira', status: 'full', hasChat: false },
  { id: 'zero-grau', nome: 'Zero Grau', status: 'full', hasChat: true },
  { id: 'polar', nome: 'Polar', status: 'full', hasChat: false },
  { id: 'avalanche', nome: 'Avalanche', status: 'full', hasChat: true },
  { id: 'frozen-da-elle', nome: 'Frozen da Elle', status: 'open', hasChat: true, ocupacao: 4 },
];

function App() {
  const [telaAtiva, setTelaAtiva] = useState<TelaAtiva>('servidores');

  const [nome, setNome] = useState('ellen monroe');
  const [corSelecionada, setCorSelecionada] = useState('azul');
  const [puffle, setPuffle] = useState(false);
  const [nomePuffle, setNomePuffle] = useState('');
  const [isVip, setIsVip] = useState(false);
  const [loading, setLoading] = useState(false);

  const nomeLimpo = nome.replace('!bday20', '').trim();

  useEffect(() => {
    setIsVip(nome.includes('!bday20'));
  }, [nome]);

  const selecionarServidor = (servidor: Servidor) => {
    if (servidor.status !== 'open') {
      alert(`O servidor ${servidor.nome} está cheio. Tente outro servidor.`);
      return;
    }
    setTelaAtiva('login');
  };

  const enviarRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeLimpo) {
      alert('Por favor, insira o nome do seu pinguim.');
      return;
    }

    setLoading(true);

    try {
      await axios.post('http://127.0.0.1:8000/api/rsvp', {
        nome_pinguim: nomeLimpo,
        cor: corSelecionada,
        trazendo_puffle: puffle,
        nome_puffle: puffle ? nomePuffle : null,
        item_vip: isVip ? 'puffle_de_elite' : null,
      });

      setTimeout(() => setTelaAtiva('cartao'), 1200);
    } catch {
      alert('Erro de conexão com o servidor. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (telaAtiva === 'servidores') {
    return (
      <div style={styles.cpBackground}>
        <Credito />
        <div style={styles.serverContainer}>
          <h1 style={styles.serverTitleComic}>SUGESTÕES DE SERVIDORES</h1>
          
          <div style={styles.serverList}>
            {SERVIDORES.map((servidor) => {
              const isOpen = servidor.status === 'open';
              const barrasTotais = 5;

              return (
                <div 
                  key={servidor.id} 
                  style={styles.serverRow}
                  onClick={() => selecionarServidor(servidor)}
                >
                  
                  {/* ESQUERDA: EMOJI + NOME */}
                  <div style={styles.serverRowLeft}>
                    <img 
                      src={isOpen ? '/emoji_open.png' : '/emoji_full.png'} 
                      alt="Amigos" 
                      style={styles.buddyIcon}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <span style={styles.serverNameTextBurbank}>{servidor.nome}</span>
                  </div>
                  
                  {/* DIREITA: BARRINHAS OU TEXTO LOTADO */}
                  <div style={styles.serverRowRight}>
                    {isOpen ? (
                      <div style={styles.greenBarsContainer}>
                        {Array.from({ length: barrasTotais }).map((_, i) => (
                          <div 
                            key={i} 
                            style={{
                              ...styles.greenBar, 
                              height: `${14 + (i * 4)}px`, 
                              backgroundColor: i < (servidor.ocupacao || 0) ? '#00ff00' : '#004400',
                              borderColor: i < (servidor.ocupacao || 0) ? '#005500' : '#002200'
                            }}
                          ></div>
                        ))}
                      </div>
                    ) : (
                      <span style={styles.lotadoTextComic}>LOTADO</span>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

if (telaAtiva === 'cartao') {
  return (
    <div style={styles.cpBackground}>
      <Credito />

      <CartaoRSVP
        nome={nomeLimpo}
        cor={corSelecionada}
        puffle={puffle}
        nomePuffle={nomePuffle}
        onOpenMap={() => setTelaAtiva('danceclub')}
      />
    </div>
  );
}

if (telaAtiva === 'danceclub') {
  return (
    <DanceClub
      onBack={() => setTelaAtiva('cartao')}
    />
  );
}

  return (
    <div style={styles.cpBackground}>
      <Credito />
      <div style={styles.createPenguinWindow}>
        
        {/* LADO ESQUERDO */}
        <div style={styles.createLeft}>
          <div style={styles.sunburstBackground}>
            <img
              src={`/${corSelecionada}.png`}
              alt="Seu Pinguim"
              style={styles.bigPenguin}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div style={styles.penguinShadow}></div>
          </div>
          <p style={styles.previewName}>{nomeLimpo || 'Nome do Pinguim'}</p>
        </div>

        {/* LADO DIREITO */}
        <form style={styles.createRight} onSubmit={enviarRSVP}>
          
          <h2 style={styles.formTitle}>CRIAR PINGUIM</h2>

          <div style={styles.stepGroup}>
            <div style={styles.stepBubble}>1</div>
            <div style={styles.stepContent}>
              <label style={styles.stepLabel}>Nome do pinguim (seu @):</label>
              <input
                style={styles.classicInput}
                value={nome}
                onChange={(e) => setNome(e.target.value.toLowerCase())}
                placeholder="teu nome mesmo kk"
              />
            </div>
          </div>

          <div style={styles.stepGroup}>
            <div style={styles.stepBubble}>2</div>
            <div style={styles.stepContent}>
              <label style={styles.stepLabel}>Escolha a skin:</label>
              <div style={styles.colorSquareGrid}>
                {CORES_CP.map((cor) => (
                  <div
                    key={cor.nome}
                    onClick={() => setCorSelecionada(cor.nome)}
                    style={{
                      ...styles.colorSquare,
                      backgroundColor: cor.hex,
                      outline: corSelecionada === cor.nome ? '3px solid #0054a6' : '1px solid #ccc',
                      outlineOffset: '2px'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div style={styles.stepGroup}>
            <div style={styles.stepBubble}>3</div>
            <div style={styles.stepContent}>
              <label style={styles.classicCheckboxLabel}>
                <input
                  type="checkbox"
                  checked={puffle}
                  onChange={() => setPuffle(!puffle)}
                  style={{ transform: 'scale(1.2)' }}
                />
                Vou levar um Puffle (+1)
              </label>
              
              {puffle && (
                <div style={styles.puffleJokeBox}>
                  <p style={styles.jokeText}>
                    (casquinha, namorade, peixe, cachorro, papagaio, chaveirinho...)
                  </p>
                  <input
                    style={styles.classicInput}
                    value={nomePuffle}
                    onChange={(e) => setNomePuffle(e.target.value)}
                    placeholder="nome do teu +1"
                  />
                </div>
              )}
            </div>
          </div>

          <div style={styles.bottomAction}>
             <button type="submit" style={styles.classicButtonBlue}>
              {loading ? 'CARREGANDO...' : 'CRIAR PINGUIM'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );

  function Credito() {
  return (
    <div style={styles.credito}>
      feito por ellen monroe
    </div>
  );
}
}

const styles: Record<string, CSSProperties> = {
  // A VINHETA: Radial gradient escurecendo nas bordas
  cpBackground: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'radial-gradient(circle at center, #027fcc 0%, #00529b 100%)', 
    padding: '20px',
    boxSizing: 'border-box',
    fontFamily: '"Burbank Big Condensed Black", Arial, sans-serif',
  },

  // TELA DE SERVIDORES
  serverContainer: {
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  serverTitleComic: {
    fontFamily: '"CCComicrazy Italic", sans-serif',
    color: '#ffffff',
    fontSize: '2.0rem',
    fontStyle: 'italic',
    margin: 0,
    textShadow: '-2px -2px 0 #000e4e, 2px -2px 0 #000e4e, -2px 2px 0 #000e4e, 2px 2px 0 #000e4e, 0 4px 0 #000e4e', 
    letterSpacing: '1px',
    textAlign: 'center',
  },
  serverList: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  serverRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(to bottom, #006ebc, #004d8a)', 
    border: '3px solid #1a8ad6', 
    borderRadius: '30px',
    padding: '10px 20px',
    cursor: 'pointer',
    boxShadow: 'inset 0 4px 0 rgba(255,255,255,0.2), 0 4px 8px rgba(0,0,0,0.3)', 
  },
  serverRowLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px', // Espaço entre o emoji e o nome
  },
  serverNameTextBurbank: {
    fontFamily: '"Burbank Big Condensed Black", sans-serif',
    color: '#ffffff',
    fontSize: '1.6rem',
    textShadow: '1px 1px 0 #000', 
  },
  serverRowRight: {
    display: 'flex',
    alignItems: 'center',
  },
  buddyIcon: {
    width: '32px', // Tamanho certinho do emoji do CP
    borderRadius: '50%',
    height: 'auto',
    filter: 'drop-shadow(1px 1px 0 #000)'
  },
  lotadoTextComic: {
    fontFamily: '"CCComicrazy Italic", sans-serif',
    color: '#ffffff',
    fontSize: '1.4rem',
    fontStyle: 'italic',
    textShadow: '-2px -2px 0 #003366, 2px -2px 0 #003366, -2px 2px 0 #003366, 2px 2px 0 #003366, 0 3px 0 #003366',
    letterSpacing: '1px',
    transform: 'skewX(-5deg)',
  },
  greenBarsContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '3px',
    height: '24px',
    marginLeft: '5px'
  },
  greenBar: {
    width: '8px',
    transform: 'skewX(-15deg)', 
    borderRadius: '0px', 
    boxShadow: '1px 1px 0 rgba(0,0,0,0.5)' 
  },

  // TELA CRIAR PINGUIM
  createPenguinWindow: {
    width: '100%',
    maxWidth: '750px',
    backgroundColor: '#ffffff',
    border: '6px solid #0088d3',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    boxShadow: '0 0 0 6px #ffffff, 0 10px 30px rgba(0,0,0,0.5)', 
  },
  createLeft: {
    flex: '1 1 300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px 20px',
    position: 'relative',
    overflow: 'hidden',
    borderRight: '2px solid #e0e0e0',
  },
  sunburstBackground: {
    width: '100%',
    height: '280px',
    background: 'radial-gradient(circle, #ffffff 10%, #dcf0fb 80%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bigPenguin: {
    width: '160px',
    height: 'auto',
    zIndex: 2,
  },
  penguinShadow: {
    width: '110px',
    height: '20px',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: '50%',
    marginTop: '-10px',
    zIndex: 1,
  },
  previewName: {
    fontFamily: '"Burbank Big Condensed Black", sans-serif',
    fontSize: '1.6rem',
    color: '#0054a6',
    marginTop: '15px',
  },
  createRight: {
    flex: '1 1 350px',
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formTitle: {
    fontFamily: '"Burbank Big Condensed Black", sans-serif',
    fontSize: '1.8rem',
    color: '#333',
    margin: '0 0 5px 0'
  },
  stepGroup: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  stepBubble: {
    fontFamily: '"Burbank Big Condensed Black", sans-serif',
    width: '30px',
    height: '30px',
    backgroundColor: '#0088d3',
    borderRadius: '50%',
    color: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.3rem',
    flexShrink: 0,
    boxShadow: 'inset 0 4px 0 rgba(255,255,255,0.3)',
  },
  stepContent: {
    width: '100%',
  },
  stepLabel: {
    display: 'block',
    fontFamily: '"Burbank Big Condensed Black", sans-serif',
    fontSize: '1.2rem', 
    color: '#333333',
    fontWeight: 'normal', 
    marginBottom: '6px',
    letterSpacing: '1px',
  },
  // FONTE BURBANK AQUI NO INPUT
  classicInput: {
    width: '100%',
    padding: '10px',
    border: '2px solid #cccccc',
    borderRadius: '8px',
    fontSize: '1rem', // Um pouco maior pq a Burbank é menorzinha
    fontFamily: '"Burbank Big Condensed Black", Arial, sans-serif',
    outline: 'none',
    boxSizing: 'border-box',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
  },
  colorSquareGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 35px)',
    gap: '6px',
  },
  colorSquare: {
    width: '35px',
    height: '35px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  classicCheckboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: '"Burbank Big Condensed Black", sans-serif', // <-- Burbank aqui!
    fontSize: '1rem', // <-- Maiorzinha
    color: '#333333',
    fontWeight: 'normal', // <-- Sem bold
    cursor: 'pointer',
    letterSpacing: '1px',
  },
  puffleJokeBox: {
    marginTop: '10px', 
    background: '#eff8ff', 
    padding: '10px', 
    borderRadius: '10px', 
    border: '2px dashed #bce2ff'
  },
  jokeText: {
    fontFamily: '"Burbank Big Condensed Black", sans-serif', // <-- Burbank aqui!
    fontSize: '1.1rem',
    color: '#666',
    margin: '0 0 5px 0',
    fontWeight: 'normal',
    letterSpacing: '1px',
  },
  bottomAction: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '5px',
  },
  classicButtonBlue: {
    fontFamily: '"Burbank Big Condensed Black", sans-serif',
    background: 'linear-gradient(to bottom, #0071c5, #004d8a)',
    color: '#ffffff',
    border: '2px solid #003366',
    borderRadius: '20px',
    padding: '8px 20px',
    fontSize: '1.3rem',
    cursor: 'pointer',
    boxShadow: 'inset 0 4px 0 rgba(255,255,255,0.2), 0 4px 6px rgba(0,0,0,0.2)',
  },

  // CARTÃO DE RSVP FINAL
  playerCard: {
    width: '280px',
    backgroundColor: '#dcf0fb',
    border: '6px solid #ffffff',
    borderRadius: '15px',
    boxShadow: '0 0 0 4px #0088d3, 0 10px 20px rgba(0,0,0,0.5)',
    overflow: 'hidden',
  },
  cardHeaderBurbank: {
    fontFamily: '"Burbank Big Condensed Black", sans-serif',
    backgroundColor: '#0088d3',
    padding: '8px 12px',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '1.6rem',
    textAlign: 'center',
  },
  cardBody: {
    padding: '15px',
    color: '#333333',
    fontFamily: '"Burbank Big Condensed Black", sans-serif', // <-- Burbank no cartão final!
    fontSize: '1.3rem', // <-- Aumentei pro cartão ficar bonitão
    lineHeight: 1.2,
    fontWeight: 'normal',
    letterSpacing: '1px',
  },
  actionButtonBurbank: {
    fontFamily: '"Burbank Big Condensed Black", sans-serif',
    width: '100%',
    background: 'linear-gradient(to bottom, #ffd95b 0%, #ffbf1f 100%)',
    color: '#17466f',
    border: '3px solid #17466f',
    borderRadius: '15px',
    padding: '10px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '15px',
    boxShadow: 'inset 0 6px 0 rgba(255,255,255,0.2), 0 4px 6px rgba(0,0,0,0.2)',
  },
  credito: {
  position: 'fixed',
  right: '14px',
  bottom: '10px',
  zIndex: 9999,
  fontFamily: 'Arial, sans-serif',
  fontSize: '0.75rem',
  fontWeight: 700,
  color: '#ffffff',
  textShadow: '1px 1px 0 #003366',
  opacity: 0.85,
  pointerEvents: 'none',
},
};



export default App;