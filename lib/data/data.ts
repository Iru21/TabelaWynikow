import Player from "./player"

import getNewScore from "../util/getnewscore"
import RandomFromMap from "../util/randomfrommap"

export default class Data {
    public players: Map<number, Player> = new Map<number, Player>()

    constructor() {
        this._populate(15)
    }

    init() {
        setInterval(() => {
            const p = RandomFromMap(this.players)
            const n = getNewScore(p.score)
            console.log("s")
            p.setScore(n)
        }, 10000)
    }

    reset() {
        console.log("r")
        this.players.forEach((p) => {
            p.setScore(0)
        })
    }

    private _populate(n: number) {
        console.log("c")
        for(let i = 0; i < n; i++) {
            this.players.set(i, new Player(i, `Gracz ${i}`, 0))
        }
    }
}