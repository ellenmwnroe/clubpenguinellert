import { useState, useEffect } from 'react';
import axios from 'axios';
import MapaDaFesta from './MapaDaFesta'; // O mapa que criamos antes!

const CORES_CP = [
  { nome: 'azul', hex: '#0054a6' },
  { nome: 'verde', hex: '#00923f' },
  { nome: 'rosa', hex: '#e4007e' },
  { nome: 'preto', hex: '#231f20' },
  { nome: 'roxo', hex: '#662d91' },
  { nome: 'laranja', hex: '#f7941d' },
];

function App() {
  // Agora começamos na tela de SERVIDORES
  const [telaAtiva, setTelaAtiva] = useState<'servidores' | 'login' | 'cartao'>('servidores');
  const [nome, setNome] = useState('');
  const [corSelecionada, setCorSelecionada] = useState('azul');
  const [puffle, setPuffle] = useState(false);
  const [nomePuffle, setNomePuffle] = useState('');
  const [isVip, setIsVip] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mapaAtivo, setMapaAtivo] = useState(false);

  useEffect(() => {
    if (nome.includes('!bday20')) {
      setIsVip(true);
    } else {
      setIsVip(false);
    }
  }, [nome]);

  const enviarRSVP = async () => {
    if (!nome) {
      alert('opa, esqueceu de colocar o nome do pinguim!');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://127.0.0.1:8000/api/rsvp', {
        nome_pinguim: nome.replace('!bday20', '').trim(),
        cor: corSelecionada,
        trazendo_puffle: puffle,
        nome_puffle: puffle ? nomePuffle : null,
        item_vip: isVip ? 'puffle_de_elite' : null
      });
      setTimeout(() => setTelaAtiva('cartao'), 1200);
    } catch (e) {
      alert('erro de conexão com a ilha (server off).');
    } finally {
      setLoading(false);
    }
  };

  // TELA 1: ESCOLHA DE SERVIDOR
  if (telaAtiva === 'servidores') {
    return (
      <div style={styles.container}>
        <div style={styles.serverWindow}>
          <div style={styles.serverHeader}>
            <h2 style={{margin: 0}}>selecione um servidor</h2>
            <p style={{margin: '5px 0 0 0', fontSize: '0.9rem', color: '#caf0f8'}}>o drop vai ser pesado. escolha com sabedoria.</p>
          </div>
          <div style={styles.serverList}>
            {/* Servidor 1 (O que a pessoa vai clicar) */}
            <div style={styles.serverItem} onClick={() => setTelaAtiva('login')}>
              <div style={styles.serverInfo}>
                <span style={styles.serverName}>salão_jardins_lotado ❄️</span>
                <span style={styles.serverDesc}>sugestão: evento principal às 20h30</span>
              </div>
              <div style={styles.statusBar}><div style={{...styles.statusFill, width: '95%', background: '#d62828'}}></div></div>
            </div>

            {/* Outros servidores "fakes" só pela zoeira */}
            <div style={styles.serverItem} onClick={() => setTelaAtiva('login')}>
              <div style={styles.serverInfo}>
                <span style={styles.serverName}>fofoca_no_iglu 🐧</span>
                <span style={styles.serverDesc}>servidor pra quem vai ficar sentado</span>
              </div>
              <div style={styles.statusBar}><div style={{...styles.statusFill, width: '60%', background: '#ffb703'}}></div></div>
            </div>

            <div style={styles.serverItem} onClick={() => setTelaAtiva('login')}>
              <div style={styles.serverInfo}>
                <span style={styles.serverName}>puffle_party_vip 🐾</span>
                <span style={styles.serverDesc}>só entra quem tem acompanhante</span>
              </div>
              <div style={styles.statusBar}><div style={{...styles.statusFill, width: '80%', background: '#00923f'}}></div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // TELA 3: CARTÃO DO PINGUIM (COM O MAPA)
  if (telaAtiva === 'cartao') {
    return (
      <div style={styles.container}>
        {mapaAtivo && <MapaDaFesta onClose={() => setMapaAtivo(false)} pinguimName={nome.replace('!bday20', '')}/>}
        
        <div style={styles.playerCard}>
          <div style={styles.cardHeader}>
            <span>{nome.replace('!bday20', '')}</span>
            <div style={styles.levelBadge}>nível 20</div>
          </div>
          <div style={styles.cardBody}>
            <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#0054a6', fontWeight: 'bold' }}>
              vip do b-day da ellen 🎂
            </p>
            <p>📍 <strong>local:</strong> salão do jardins (20h30)</p>
            <p>🎨 <strong>skin:</strong> {corSelecionada}</p>
            {puffle && <p>🐾 <strong>+1:</strong> {nomePuffle || 'puffle anônimo'}</p>}
            
            <button onClick={() => setMapaAtivo(true)} style={styles.actionButton}>[ abrir mapa da festa ]</button>
          </div>
        </div>
      </div>
    );
  }

  // TELA 2: LOGIN (CRIAR PINGUIM) - CONTINUA IGUAL
  return (
    <div style={styles.container}>
      <div style={{ textAlign: 'center', marginBottom: '20px', color: '#fff' }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem', textShadow: '2px 2px 0 #0054a6' }}>
          ellen's b-day: nível 20
        </h1>
        <p style={{ fontSize: '1.1rem', fontWeight: 'bold', background: '#0054a6', display: 'inline-block', padding: '5px 15px', borderRadius: '15px' }}>
          servidor: salão do jardins • 20h30
        </p>
      </div>

      <div style={styles.legacyWindow}>
        <div style={styles.leftPanel}>
          <img 
            src={`/${corSelecionada}.png`} 
            alt={`pinguim ${corSelecionada}`} 
            style={styles.penguinImage}
            onError={(e) => {(e.target as HTMLImageElement).style.display = 'none';}}
          />
          <div style={styles.shadow}></div>
        </div>

        <div style={styles.rightPanel}>
          <div style={styles.inputGroup}>
            <div style={styles.numberBadge}>1</div>
            <div style={{width: '100%'}}>
              <p style={styles.textSmall}>teu @ do pinguim:</p>
              <input style={styles.input} value={nome} onChange={(e) => setNome(e.target.value.toLowerCase())} placeholder="ex: pinguim_zica"/>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.numberBadge}>2</div>
            <div>
              <p style={styles.textSmall}>escolha a skin:</p>
              <div style={styles.colorGrid}>
                {CORES_CP.map(c => (
                  <div 
                    key={c.nome} onClick={() => setCorSelecionada(c.nome)}
                    style={{...styles.colorCircle, backgroundColor: c.hex, border: corSelecionada === c.nome ? '3px solid #000' : '2px solid transparent'}}
                  />
                ))}
              </div>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.numberBadge}>3</div>
            <div style={{width: '100%'}}>
              <label style={styles.checkbox}>
                <input type="checkbox" checked={puffle} onChange={() => setPuffle(!puffle)} style={{ cursor: 'pointer' }}/>
                <span>vou levar um puffle (+1)</span>
              </label>
              {puffle && (
                <div style={{marginTop: '10px', background: '#f0f8ff', padding: '10px', borderRadius: '8px'}}>
                  <p style={{...styles.textSmall, color: '#0054a6'}}>nome do acompanhante:</p>
                  <input style={styles.input} value={nomePuffle} onChange={(e) => setNomePuffle(e.target.value)} placeholder="ex: flufy"/>
                </div>
              )}
            </div>
          </div>

          <button onClick={enviarRSVP} style={styles.button}>
            {loading ? 'carregando nível 20...' : 'entrar no servidor'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  // ... (Cole os estilos que você já tinha no App.tsx aqui)
  container: { minHeight: '100vh', background: 'radial-gradient(circle, #90e0ef 0%, #0077b6 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif', padding: '20px', boxSizing: 'border-box' },
  legacyWindow: { width: '100%', maxWidth: '780px', background: '#fff', border: '6px solid #0054a6', borderRadius: '20px', display: 'flex', flexDirection: 'row', overflow: 'hidden', boxShadow: '0 15px 30px rgba(0,0,0,0.3)', flexWrap: 'wrap' },
  leftPanel: { flex: '1 1 300px', background: 'repeating-linear-gradient(45deg, #f8fcf8, #f8fcf8 10px, #eef7ff 10px, #eef7ff 20px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 20px', borderRight: '2px solid #e0e0e0' },
  penguinImage: { width: '220px', height: 'auto', zIndex: 2, transition: 'all 0.3s ease' },
  shadow: { width: '130px', height: '20px', background: 'rgba(0,0,0,0.1)', borderRadius: '50%', marginTop: '-15px', zIndex: 1 },
  rightPanel: { flex: '1 1 350px', padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', background: '#ffffff' },
  inputGroup: { display: 'flex', gap: '15px', alignItems: 'flex-start' },
  numberBadge: { background: '#0054a6', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', flexShrink: 0, marginTop: '5px', fontSize: '0.9rem' },
  textSmall: { fontSize: '0.9rem', margin: '0 0 5px 0', color: '#333', fontWeight: 'bold' },
  input: { width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #ccc', outline: 'none', boxSizing: 'border-box', fontSize: '1rem', background: '#fafafa' },
  colorGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' },
  colorCircle: { width: '45px', height: '45px', borderRadius: '10px', cursor: 'pointer', transition: 'transform 0.1s' },
  checkbox: { display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', color: '#0054a6', cursor: 'pointer', fontSize: '1rem' },
  button: { padding: '15px', background: '#ffb703', color: '#023047', border: '3px solid #023047', borderRadius: '10px', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer', marginTop: '10px', boxShadow: '3px 3px 0 #023047', transition: 'all 0.1s ease' },
  playerCard: { width: '320px', background: '#48cae4', border: '6px solid #fff', borderRadius: '20px', color: '#023047', boxShadow: '0px 15px 30px rgba(0,0,0,0.3)' },
  cardHeader: { padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.4)', fontWeight: 'bold', fontSize: '1.2rem' },
  levelBadge: { background: '#ffb703', padding: '4px 10px', borderRadius: '15px', fontSize: '0.8rem', border: '2px solid #023047' },
  cardBody: { padding: '25px', display: 'flex', flexDirection: 'column', gap: '10px' },
  actionButton: { width: '100%', padding: '12px', marginTop: '20px', background: '#fff', border: '3px solid #023047', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', color: '#023047' },
  
  // NOVOS ESTILOS PARA A TELA DE SERVIDORES
  serverWindow: { width: '100%', maxWidth: '500px', background: '#fff', border: '6px solid #0054a6', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' },
  serverHeader: { background: '#0054a6', color: '#fff', padding: '20px', textAlign: 'center' },
  serverList: { padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', background: '#f0f8ff' },
  serverItem: { background: '#fff', border: '3px solid #bce2ff', borderRadius: '10px', padding: '15px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  serverInfo: { display: 'flex', flexDirection: 'column', gap: '5px' },
  serverName: { fontWeight: 'bold', color: '#0054a6', fontSize: '1.1rem' },
  serverDesc: { fontSize: '0.8rem', color: '#555' },
  statusBar: { width: '80px', height: '12px', background: '#e0e0e0', borderRadius: '10px', overflow: 'hidden', border: '1px solid #ccc' },
  statusFill: { height: '100%' }
};

export default App;