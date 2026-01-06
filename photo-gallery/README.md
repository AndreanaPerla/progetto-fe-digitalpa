# Photo Gallery

Un'applicazione di galleria fotografica sviluppata con Vue 3, Vite e tecnologie moderne.

## Tecnologie utilizzate

- **Vue 3** - Framework JavaScript progressivo
- **Vite** - Build tool veloce e moderno
- **Vue Router** - Routing ufficiale per Vue.js
- **Vuex** - State management pattern
- **Axios** - Client HTTP per API
- **Tailwind CSS** - Framework CSS utility-first

## Installazione

1. Installa le dipendenze:

```bash
npm install
```

2. Avvia il server di sviluppo:

```bash
npm run dev
```

3. Apri il browser all'indirizzo mostrato nel terminale (solitamente http://localhost:5173)

## Struttura del progetto

```
src/
├── components/     # Componenti riutilizzabili
├── views/         # Pagine dell'applicazione
├── router/        # Configurazione routing
├── store/         # Store Vuex per state management
├── App.vue        # Componente principale
├── main.js        # Entry point dell'applicazione
└── style.css      # Stili globali con Tailwind
```

## Script disponibili

- `npm run dev` - Avvia il server di sviluppo
- `npm run build` - Crea la build di produzione
- `npm run preview` - Anteprima della build di produzione

## Funzionalità

- Navigazione tra pagine con Vue Router
- Gestione dello state con Vuex
- Caricamento delle foto tramite API con Axios
- Interfaccia responsive con Tailwind CSS
- Hot Module Replacement con Vite
