# 🐧 club elle — meu convite de niver

um mini projeto inspirado na estética clássica do club penguin
feito pra simular um rsvp interativo com vibe de jogo antigo

---

## ✨ o que tem aqui

* seleção de servidor estilo club penguin
* criação de pinguim (nome + cor + puffle opcional)
* envio de rsvp via api (fastapi + sqlite)
* cartão de jogador personalizado
* sala **dance club** interativa com:

  * música ambiente
  * pinguins animados (gif)
  * balões de fala
  * interação externa (link pro pinterest)

---

## 🧱 stack

**frontend**

* react + typescript
* css inline (estilo old school)

**backend**

* fastapi
* sqlite

---

## 📁 estrutura

```
/frontend
  App.tsx
  CartaoRSVP.tsx
  danceclub.tsx

/public
  danceclub.png
  danceclub.mp3
  toolbar.png
  penguindance1.gif
  penguindance2.gif
  penguindance3.gif

/backend
  main.py (fastapi)
  festa_cp.db
```

---

## 🚀 como rodar

### 1. backend

```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
```

api roda em:

```
http://127.0.0.1:8000
```

---

### 2. frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🎮 fluxo

1. usuário entra → escolhe servidor
2. cria pinguim
3. envia rsvp
4. recebe cartão
5. entra no dance club

---

## 🎧 assets necessários

coloca isso em `/public`:

```
danceclub.png
danceclub.mp3
toolbar.png
penguindance1.gif
penguindance2.gif
penguindance3.gif
emoji_open.png
emoji_full.png
```

---

## ⚠️ observações

* autoplay da música pode ser bloqueado → precisa clicar na tela
* layout usa `aspect-ratio` pra manter proporção no mobile
* gifs devem ser locais (tenor quebra transparência)

---

## 🧠 ideias futuras

* chat fake estilo club penguin
* multiplayer realtime (websocket)
* animação de luz na pista
* sistema de itens/vip real
* salvar usuários

---

## 👤 créditos

feito por **ellen monroe**

