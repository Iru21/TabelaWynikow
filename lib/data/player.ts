export default class Player {
    constructor(public id: number, public name: string, public score: number) {}
    setScore(score: number) {
        this.score = score
        console.log(this)
    }
}