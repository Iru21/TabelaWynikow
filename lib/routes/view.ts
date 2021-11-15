import express from "express";

export default class ViewRouter {
    public router: express.Router

    constructor() {
        this.router = express.Router()

        this._configure()
    }

    private _configure() {
        this.router.get('/', (req, res) => {
            res.sendFile(__dirname + '/../public/index.html')
        })
    }
}