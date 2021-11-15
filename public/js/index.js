
class Player {
    constructor(id, name, score) {
        this.id = id;
        this.name = name;
        this.score = score;
    }
}

const $ = (id) => document.getElementById(id)

document.addEventListener('DOMContentLoaded', () => {
    addPlayersToTable()
})

async function resetData() {
    await fetch('api/players/reset', {method: 'DELETE'})
    addPlayersToTable()
}

async function addPlayersToTable() {
    clearTable()
    const players = await getPlayers()
    const sorted = sortByScore(players)
    for(let i = 0; i < sorted.length; i++) {
        addToTable(sorted[i], i + 1)
    }
}

function addToTable(player, place) {
    // nie ma typescripta :(
    /**
     * @type {HTMLTableElement}
     */
    const table = $('wyniki')
    /**
     * @type {HTMLTableRowElement}
     */
    const r = createRow(table)
    /**
     * @type {HTMLTableCellElement[]}
     */
    const [n, name, score] = createCells(r)
    n.innerText = place
    name.innerText = player.name
    score.innerText = player.score
}

/**
 * 
 * @param {Player[]} players 
 */
function sortByScore(players) {
    players.sort((a, b) => b.score - a.score)
    return players
}

async function getPlayers() {
    // piekło (:
    /**
     * @type {Object}
     */
    const data = (await (await fetch('api/players/getAll')).json())
    setLastUpdate(data.updated)
    return data.players.map(p => new Player(p.id, p.name, p.score))
}

function setLastUpdate(date) {
    $('lastUpdate').innerText = new Date(date).toISOString().replace("T", " ").split(".")[0]
}

function clearTable() {
    /**
     * @type {HTMLTableElement}
     */
    const table = $('wyniki')
    while (table?.rows.length > 1) {
        table.deleteRow(1)
    }
}

function createRow(t) {
    return t.insertRow(t.rows.length)
}

function createCells(r) {
    const c = []
    for (let i = 0; i < 3; i++) {
        c.push(r.insertCell(i))
    }
    return c
}