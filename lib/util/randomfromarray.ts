export default function RandomFromArray(arr: any[]): any {
    return arr[Math.floor(Math.random() * arr.length)]
}