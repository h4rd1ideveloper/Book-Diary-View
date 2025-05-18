
# Diário de Livros - Front-end (React)

## Descrição

SPA React + TypeScript para consumo da API de Diário de Livros, com rotas públicas e privadas, Redux Toolkit, React Router e Tailwind CSS.

## Tecnologias

* React 19+ (Vite)
* TypeScript
* Redux Toolkit + redux-persist
* React Router v6
* Tailwind CSS
* Axios
* jwt-decode

## Setup

```bash
# criar projeto via Vite
git clone <repo-front-url>
cd book-diary-front
npm install
```

## Rodando em Dev

```bash
npm run dev
```

Acesse `http://localhost:5173`.

## Scripts

```bash
npm run dev
npm run build      # build de produção
npm run preview    # preview do build
npm run lint       # lint (ESLint)
```

## Configurações

* **API Base URL**: defina em `src/lib/http.client.ts` (baseURL).
* **Rotas**:

    * `/login`, `/register` (públicas)
    * `/`, `/add`, `/edit/:id` (privadas)

## Persistência

O estado de autenticação (token + username) é salvo no localStorage via redux-persist.

---

*Leia documentação interna dos módulos para mais detalhes.*
