export default class Player {
    constructor(public id: string, public name: string, public score: number) {}
    setScore(score: number) {
        this.score = score
        console.log(this)
    }
}