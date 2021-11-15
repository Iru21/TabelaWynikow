import Player from "./player"

import getNewScore from "../util/getnewscore"
import RandomFromMap from "../util/randomfrommap"
import GetRandomNames from "../util/getrandomnames"

import { randomBytes } from "crypto"

export default class Data {
    public players: Map<number, Player> = new Map<number, Player>()
    public updated: number = Date.now()

    constructor() {
        this._populate(15)
    }

    init() {
        setInterval(() => {
            const p = RandomFromMap(this.players)
            const n = getNewScore(p.score)
            console.log("s")
            p.setScore(n)
            this.updated = Date.now()
        }, 10000)
    }

    reset() {
        console.log("r")
        this.players.forEach((p) => {
            p.setScore(0)
        })
    }

    private async _populate(n: number) {
        console.log("c")
        const names = await GetRandomNames()
        for(let i = 0; i < n; i++) {
            this.players.set(i, new Player(randomBytes(10).toString('hex'), names[i], 0))
        }
        console.log(this.players)
    }
}
