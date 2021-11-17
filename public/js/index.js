
class Player {
    constructor(id, name, score) {
        this.id = id;
        this.name = name;
        this.score = score;
    }
}

const state = new Map()

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
        const lastState = state.get(sorted[i].id)
        const place = i + 1
        const char = (lastState == undefined || lastState == place) ? '' : (lastState > place ? `- | ↑ (z pozycji ${lastState})` : `- | ↓ (z pozycji ${lastState})`)
        addToTable(sorted[i], `${place} ${char}`)
        state.set(sorted[i].id, place)
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
    const [n, id, name, score] = createCells(r)
    n.innerText = place
    id.innerText = player.id
    score.innerText = player.score

    const picEl = document.createElement('img')
    name.appendChild(picEl)
    picEl.src = `https://avatars.dicebear.com/api/identicon/${player.name.split(' ')[0]}.svg`
    picEl.width = '20'
    picEl.height = '20'
    picEl.style.marginRight = '10px'
    
    const nameEl = document.createElement('span')
    name.appendChild(nameEl)
    nameEl.innerText = player.name
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
    for (let i = 0; i < 4; i++) {
        c.push(r.insertCell(i))
    }
    return c
}