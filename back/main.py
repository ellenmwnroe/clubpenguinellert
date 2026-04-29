from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3

app = FastAPI()

# Configuração de CORS para o React conseguir conversar com o back-end
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Depois podemos restringir para o localhost do front
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conexão com o banco de dados SQLite
def get_db_connection():
    conn = sqlite3.connect('festa_cp.db')
    conn.row_factory = sqlite3.Row
    return conn

# Criando a tabela se não existir
def init_db():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS convidados (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_pinguim TEXT NOT NULL,
            cor TEXT NOT NULL,
            trazendo_puffle BOOLEAN NOT NULL,
            data_preferida TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# Modelo de dados que vamos receber do Front-end
class Convidado(BaseModel):
    nome_pinguim: str
    cor: str
    trazendo_puffle: bool
    data_preferida: str

@app.post("/api/rsvp")
def confirmar_presenca(convidado: Convidado):
    if convidado.data_preferida not in ["08/05", "22/05"]:
        raise HTTPException(status_code=400, detail="Data inválida. Escolha 08/05 ou 22/05.")

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO convidados (nome_pinguim, cor, trazendo_puffle, data_preferida) VALUES (?, ?, ?, ?)",
        (convidado.nome_pinguim, convidado.cor, convidado.trazendo_puffle, convidado.data_preferida)
    )
    conn.commit()
    conn.close()
    
    return {"mensagem": "Pinguim cadastrado com sucesso!", "user": convidado.nome_pinguim}

@app.get("/api/convidados")
def listar_convidados():
    conn = get_db_connection()
    convidados = conn.execute("SELECT * FROM convidados").fetchall()
    conn.close()
    return [dict(ix) for ix in convidados]