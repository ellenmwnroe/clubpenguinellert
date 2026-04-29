from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import sqlite3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db_connection():
    conn = sqlite3.connect('festa_cp.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS convidados (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_pinguim TEXT NOT NULL,
            cor TEXT NOT NULL,
            trazendo_puffle BOOLEAN NOT NULL,
            nome_puffle TEXT,
            item_vip TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

class Convidado(BaseModel):
    nome_pinguim: str
    cor: str
    trazendo_puffle: bool
    nome_puffle: Optional[str] = None
    item_vip: Optional[str] = None

@app.post("/api/rsvp")
def confirmar_presenca(convidado: Convidado):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO convidados (nome_pinguim, cor, trazendo_puffle, nome_puffle, item_vip) VALUES (?, ?, ?, ?, ?)",
        (convidado.nome_pinguim, convidado.cor, convidado.trazendo_puffle, convidado.nome_puffle, convidado.item_vip)
    )
    conn.commit()
    conn.close()
    return {"status": "success", "pinguim": convidado.nome_pinguim}