# todo_frontend
[React](https://react.dev/) frontend for a todo list, using CSS-in-JS with [styled-components](https://styled-components.com/) and packaged with [vite](https://vitejs.dev/).

# Preparation

Ensure `npm` and `serve` are installed. To install `serve` issue `npm install -g serve`. Create a `.env` with

```
VITE_BACKEND_URL=http://localhost:3000
```

# Building

To build, issue

```
npm install
npm run build
```

# Running

To run the server, make sure port 3001 is available. Then simply issue

```
cd dist
serve -s -p 3001
```

to run on port 3001.
