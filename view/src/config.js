const URL = window.location.hostname === `localhost`
            ? `http://localhost:3000`
            : `http://142.93.109.226/server`

const URLchat = window.location.hostname === `localhost`
? `http://127.0.0.1:5000`
: `http://142.93.109.226/chat`

export { URL, URLchat }