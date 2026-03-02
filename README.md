# SafeStep

SafeStep è una piattaforma digitale collaborativa pensata per rendere l’accessibilità visibile, semplice e condivisibile.

## Esperienza Utente

SafeStep è progettata per essere semplice, intuitiva e immediata, con un’esperienza d’uso ispirata alle piattaforme social moderne.

L’obiettivo è permettere agli utenti di:

- Trovare rapidamente informazioni utili
- Condividere esperienze in pochi passaggi
- Navigare senza barriere cognitive
- Utilizzare l’app anche da mobile con facilità

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?style=flat-square&logo=springboot)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14%2B-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens)](https://jwt.io)

---

## Descrizione del Progetto

**SafeStep** è una web application dedicata all'accessibilità per persone con disabilità motoria, realizzata come Capstone Project per l'anno accademico 2026.

L'obiettivo è creare una piattaforma collaborativa in cui gli utenti possano:

- Segnalare luoghi accessibili
- Inserire informazioni strutturate sull'accessibilità
- Lasciare recensioni e valutazioni
- Consultare in anticipo il livello di accessibilità di una struttura

Il progetto nasce da un'esigenza personale e vuole essere un esempio concreto di come la tecnologia possa migliorare inclusività e qualità della vita.

---

## MVP del Capstone

Per garantire un prodotto completo e ben rifinito entro 4 settimane, il focus del Capstone è su **SafeStep Terme**, un modulo completamente funzionante dedicato alle terme accessibili.

### Funzionalità

- Visualizzazione lista terme
- Pagina dettaglio struttura
- Indicatori di accessibilità:
  - Rampe
  - Ascensori
  - Bagni accessibili
  - Parcheggi dedicati
- Sistema di recensioni
- Sistema di autenticazione utenti (JWT)
- Inserimento nuove strutture (area autenticata)

---

## Architettura

Il progetto è organizzato in una repository monorepo con frontend e backend separati:

```
safestep/
├── safestep-frontend/   (React + Vite)
├── safestep-backend/    (Spring Boot)
└── README.md
```

---

## Stack Tecnologico

### Frontend

- **React** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Bootstrap / React-Bootstrap** - Styling e componenti
- **Responsive Design** - Mobile-first approach

### Backend

- **Spring Boot** - Framework Java enterprise
- **Spring Security** - Autenticazione e autorizzazione
- **JWT** - Token-based authentication
- **JPA / Hibernate** - ORM
- **REST API** - Servizi web RESTful

### Database

- **PostgreSQL** 14+ - Database relazionale

### Servizi Esterni

- **Cloudinary** - Gestione immagini
- **Mailgun** - Email service (opzionale)
- **Swagger/OpenAPI** - Documentazione API (extra)

---

## Autenticazione

Sistema di autenticazione basato su JWT con le seguenti funzionalità:

- Registrazione utente
- Login
- JWT token
- Rotte protette
- Ruoli base (utente / admin opzionale)

---

## Installazione e Avvio

### 1. Clonare il repository

```bash
git clone https://github.com/TUOUSERNAME/CAPSTONE.git
cd CAPSTONE
```

### 2. Avviare il Backend

```bash
cd safestep-backend
```

Creare un file `env.properties` con le seguenti configurazioni:

```properties
PORT=3001
PG_DB=jdbc:postgresql://localhost:5432/safestep
PG_USERNAME=postgres
PG_PASSWORD=your_password
JWT_SECRET=your_secret_key
```

Avviare il servizio:

```bash
mvn spring-boot:run
```

Backend disponibile su: [http://localhost:3001](http://localhost:3001)

### 3. Avviare il Frontend

```bash
cd safestep-frontend
npm install
npm run dev
```

Frontend disponibile su: [http://localhost:5173](http://localhost:5173)

---

## Roadmap

Il progetto è pensato in rilasci incrementali:

### v1 – Core

- SafeStep Terme completo

### v2 – Estensione

- Altri moduli (Parchi, Ristoranti, ecc.)
- Sistema avanzato filtri

### v3 – Pro Features

- Upload immagini
- Paginazione
- Search
- UI/UX migliorata

---

## Visione Futura

SafeStep è pensato come piattaforma modulare, con estensioni pianificate:

- SafeStep Terme
- SafeStep Parchi
- SafeStep Ristoranti
- SafeStep Hotel

Il modulo Terme rappresenta il primo vertical completamente implementato.

---

## Test

- Test unitari backend con Spring Boot Test
- Test frontend opzionali in evoluzione

---

## Conformità Accessibilità

L'interfaccia è progettata seguendo i seguenti standard:

- WCAG 2.1 livello AA
- Navigazione da tastiera
- Contrasto colori adeguato
- Responsive design

---

## Autore

**Matteo Benetazzo**  
Capstone Project – 2026
