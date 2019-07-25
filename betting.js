// require('console.table')
const results = require('./results_by_team.json')

const startBet = 2;

const result = Object.entries(results)
    // .filter(([team]) => team == 'Arsenal')
    .reduce((acc, [team, results]) => {
        let bet, nextBet = startBet
        const calcBet = (odd, draw) => {
            bet = nextBet
            nextBet = draw ? startBet : bet * 2
            let won = draw ? bet * odd : 0

            return {
                nextBet, bet, won
            }
        }

        acc[team] = results.map(({ odd, matched }) => ({
            odd, matched, ...calcBet(odd, matched)
        }))

        return acc
    }, {});

// console.log(result)
console.error('Stats!!!!!!')
const stats = Object.entries(result)
    .map(([team, result]) => {
        return {
            team, 
            won: Number(result.reduce((sum, { won }) => sum + won, 0).toFixed(2)),
            invested: Number(result.reduce((sum, { bet }) => sum + bet, 0).toFixed(2)),
            maxBet: Number(result.reduce((biggest, { bet }) => biggest > bet ? biggest: bet, 0).toFixed(2)),
        }
    })
    .sort((t1, t2) => t1.maxBet - t2.maxBet)

console.table(stats)


// https://www.betexplorer.com/soccer/england/premier-league-2018-2019/results/
const getBets = team => {
    return Array.from(document.querySelector('table.table-main tbody').querySelectorAll('tr'))
        .filter(el => el.innerText.includes(team))
        .map(el => el.querySelectorAll('td')[3])
        .map(el => ({
            odd: Number(el.innerText), 
            matched: el.classList.contains('colored'),
        }))
        .reverse()
}

const getTeams = () => ([...new Set(
    Array.from(document.querySelectorAll('table.table-main tbody tr'))
        .filter(el => ! el.innerText.includes('ROUND'))
        .map( el => el.querySelector('.h-text-left span'))
        .filter( el => el)
        .map(el => el.innerText))
])

// JSON.stringify(getTeams().reduce((acc, t) => (acc[t] = getBets(t), acc), {}))
