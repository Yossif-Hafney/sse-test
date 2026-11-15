# Project Installation Guide

This project contains two parts:

- `frontend/` — the React + Vite app that connects to the SSE stream
- `sse-demo/` — the Express server that sends server-sent events

## Requirements

Before installing, make sure you have:

- Node.js 18 or newer
- npm 9 or newer

## 1) Install dependencies

Open a terminal in the project root and run:

```bash
cd frontend && npm install
cd ../sse-demo && npm install
```

## 2) Start the backend server

From the project root:

```bash
cd sse-demo
node server.js
```

The backend listens on port `5000` and exposes the SSE endpoint at:

```text
http://localhost:5000/events
```

## 3) Start the frontend app

In a second terminal:

```bash
cd frontend
npm run dev
```

Then open the URL shown by Vite in the browser, usually:

```text
http://localhost:5173
```

The frontend will connect to the SSE server automatically.

## 4) Production build (optional)

To build the frontend for production:

```bash
cd frontend
npm run build
```

To preview the production build locally:

```bash
cd frontend
npm run preview
```

## Troubleshooting

- If the app shows a connection error, make sure the backend is still running.
- Check that the SSE server is listening on port `5000`.
- If a port is already in use, stop the existing process or change the port in `sse-demo/server.js`.
- If dependencies are missing, rerun `npm install` in the relevant folder.
