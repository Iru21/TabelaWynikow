import express, {Request, Response} from "express";
import Data from "../data/data";

export default class APIRouter {
    public router: express.Router
    private _db: Data

    constructor() {
        this.router = express.Router()

        this._db = new Data()
        this._db.init()
        this._configure()
    }

    private _configure() {
        this.router.get('/', (req: Request, res: Response) => {
            res.status(200).json({status: "ONLINE", code: 200})
        })

        this.router.get('/players/getAll', (req: Request, res: Response) => {
            res.status(200).json(Array.from(this._db.players.values()))
        })

        this.router.delete('/players/reset', (req: Request, res: Response) => {
            this._db.reset()
            res.status(200).send({message: "SUCCESS", code: 200})
        })
    }
}