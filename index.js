const winsStats = require('./wins.json').stats.content;
const lossesStats = require('./losses.json').stats.content;

const stats = winsStats.map(team => {
    const name = team.owner.shortName;
    const wins = team.value;
    const losses = lossesStats.find(({ owner: { shortName }}) => shortName === name).value;
    const draws = 38 - wins - losses;
    return {
        name,
        wins,
        losses, 
        draws,
    };
}).sort((t1, t2) => t2.draws - t1.draws)

// console.log(stats);

const wolves = require('./watford.json');

const result = wolves.content
    .filter(match => match.outcome == 'D')
    .map(match => match.gameweek.gameweek);
//     return {
//         outcome: match.outcome,
//         home: match.teams[0].team.club.abbr,
//         away: match.teams[1].team.club.abbr,
//         result: `${match.teams[0].score}-${match.teams[1].score}`,
//     }
// })

console.log('start\n', result)



