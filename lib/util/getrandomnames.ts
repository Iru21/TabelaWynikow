import axios from "axios"
import RandomFromArray from "./randomfromarray"

export default async function GetRandomNames(): Promise<string[]> {
    const f = await getNames(true)
    const m = await getNames()
    const names = [...(new Set(f)), ...(new Set(m))]
    const data = getNamesSurnames(names, await getSurnames())
    return data
}

function getNamesSurnames(names: string[], surnames: string[]): string[] {
    const r: string[] = []
    for(let i = 0; i < names.length; i++) {
        r.push(`${names[i]} ${RandomFromArray(surnames)}`)
    }
    return r
}

async function getNames(f: boolean = false): Promise<string[]> {
    const r: string[] = []
    for(let i = 0; i < 3; i++) {
        r.push(...(await axios.get(`https://namey.muffinlabs.com/name.json?count=30&type=${f ? 'fe' : ''}male&frequency=rare`)).data)
    }
    return r
}

async function getSurnames(): Promise<string[]> {
    const r: string[] = []
    for(let i = 0; i < 3; i++) {
        r.push(...(await axios.get(`https://namey.muffinlabs.com/name.json?count=30&type=surname&frequency=rare`)).data)
    }
    return r
}