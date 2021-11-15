export default function RandomFromMap(m: Map<any, any>): any {
    return m.get(Math.floor(Math.random() * m.size))
}