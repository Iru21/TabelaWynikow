import express from "express";

import ViewRouter from "./routes/view";
import APIRouter from "./routes/api";

export default class WebServer {

    private _app: express.Application
    private _port: number

    constructor(port: number | string) {
        this._port = Number(port)
        this._app = express()

        this._configure()
    }

    private _configure() {
        this._app.use(express.static('public'))

        const view = new ViewRouter()
        const api = new APIRouter()

        this._app.use('/', view.router)
        this._app.use('/api', api.router)
    }

    listen() {
        this._app.listen(this._port, () => {
            console.log(`Server is running on port ${this._port}!`)
        })
    }
}