import WebServer from "./server"
// tslint:disable-next-line: no-var-requires
require('dotenv').config()

const port = process.env.PORT || 3000

new WebServer(port).listen()