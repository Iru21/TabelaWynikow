import WebServer from "./server"

const port = process.env.PORT || 3000

new WebServer(port).listen()