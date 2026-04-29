import { useState } from 'react';
import axios from 'axios';

function App() {
  const [telaAtiva, setTelaAtiva] = useState<'login' | 'cartao'>('login');
  
  const [formData, setFormData] = useState({
    nome_pinguim: '',
    cor: 'azul',
    trazendo_puffle: false,
    data_preferida: '08/05'
  });

  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/rsvp', formData);
      setMensagem('conectando ao servidor...');
      
      setTimeout(() => {
        setTelaAtiva('cartao');
        setLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error(error);
      setMensagem('putz, o servidor caiu (back-end off).');
      setLoading(false);
    }
  };

  if (telaAtiva === 'cartao') {
    return (
      <div style={styles.mobileContainer}>
        <div style={styles.playerCard}>
          <div style={styles.cardHeader}>
            <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{formData.nome_pinguim}</h2>
            <span style={styles.badge}>nível 20</span>
          </div>
          <div style={styles.cardBody}>
            <p><strong>status:</strong> vip garantido pro dia {formData.data_preferida} 🧊</p>
            <p><strong>skin:</strong> {formData.cor}</p>
            <p><strong>inventário:</strong> {formData.trazendo_puffle ? 'puffle equipado' : 'indo solo'}</p>
            <button style={styles.pinterestButton}>
              ver wishlist no pinterest
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.mobileContainer}>
      <div style={styles.loginWindow}>
        <div style={styles.loginHeader}>
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>servidor da ellen</h1>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#333' }}>
            escolhe tua skin e entra no server.
          </p>

          <input 
            type="text" 
            required 
            style={styles.input}
            value={formData.nome_pinguim}
            onChange={(e) => setFormData({...formData, nome_pinguim: e.target.value.toLowerCase()})}
            placeholder="teu @ do pinguim"
          />

          <select 
            style={styles.input}
            value={formData.cor}
            onChange={(e) => setFormData({...formData, cor: e.target.value})}
          >
            <option value="azul">azul clássico</option>
            <option value="rosa">rosa y2k</option>
            <option value="preto">trevas</option>
          </select>

          <select 
            style={styles.input}
            value={formData.data_preferida}
            onChange={(e) => setFormData({...formData, data_preferida: e.target.value})}
          >
            <option value="08/05">drop 1: 08/05</option>
            <option value="22/05">drop 2: 22/05</option>
          </select>

          <label style={styles.checkboxContainer}>
            <input 
              type="checkbox" 
              checked={formData.trazendo_puffle}
              onChange={(e) => setFormData({...formData, trazendo_puffle: e.target.checked})}
              style={{ accentColor: '#0077b6', width: '18px', height: '18px' }}
            />
            <span style={{ fontSize: '0.9rem' }}>vai trazer um puffle?</span>
          </label>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'carregando o nível 20...' : 'entrar na ilha'}
          </button>
        </form>

        {mensagem && <p style={styles.feedback}>{mensagem}</p>}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  mobileContainer: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b8ea5', 
    backgroundImage: 'radial-gradient(circle, #90e0ef 0%, #0077b6 100%)',
    fontFamily: '"Courier New", Courier, monospace', 
    padding: '20px',
    boxSizing: 'border-box'
  },
  loginWindow: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '350px',
    border: '3px solid #03045e',
    boxShadow: '4px 4px 0px #03045e',
    overflow: 'hidden'
  },
  loginHeader: {
    backgroundColor: '#0077b6',
    color: '#fff',
    padding: '15px',
    textAlign: 'center',
    borderBottom: '3px solid #03045e'
  },
  form: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '2px solid #90e0ef',
    fontFamily: 'inherit',
    fontSize: '1rem',
    backgroundColor: '#f8f9fa',
    outline: 'none'
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
  },
  button: {
    padding: '15px',
    backgroundColor: '#ffb703', // Amarelo clássico de botão do CP
    color: '#023047',
    border: '2px solid #023047',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    fontFamily: 'inherit',
    cursor: 'pointer',
    boxShadow: '2px 2px 0 #023047',
    marginTop: '10px'
  },
  feedback: {
    textAlign: 'center',
    color: '#d62828',
    fontWeight: 'bold',
    paddingBottom: '15px'
  },
  playerCard: {
    backgroundColor: '#48cae4',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '320px',
    border: '4px solid #fff',
    boxShadow: '0px 10px 20px rgba(0,0,0,0.3)',
    color: '#023047'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    borderBottom: '2px solid rgba(255,255,255,0.5)'
  },
  badge: {
    backgroundColor: '#ffb703',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    border: '1px solid #023047'
  },
  cardBody: {
    padding: '20px',
    fontSize: '0.95rem',
    lineHeight: '1.6'
  },
  pinterestButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#e60023',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    marginTop: '15px',
    fontWeight: 'bold',
    fontFamily: 'inherit',
    cursor: 'pointer'
  }
};

export default App;