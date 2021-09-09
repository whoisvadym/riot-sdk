# Lightweight RIOT API SDK written for Node.js and Browser

## Installations
`npm install riot-sdk`

or:

`yarn add riot-sdk`

## Preparations

```JS
// Import package as ES6 import
import riot from 'riot-sdk';

// Init sdk using your credentials
const sdk = riot({
    api_key: 'YOUR-API-KEY', 
    endpoint: 'YOUR-ENDPOINT' //For instance: https://ru.api.riotgames.com
})


// Alternative import using CommonJS
const sdk = require('riot-sdk');
const riot = sdk({
    api_key: 'YOUR-API-KEY', 
    endpoint: 'YOUR-ENDPOINT'
})

// Alternative CommonJS import + initialization
const riot = require('riot-sdk')({
    api_key: 'YOUR-API-KEY', 
    endpoint: 'YOUR-ENDPOINT'
})

```

## Simple usage

```JS
/**
 * Receive summoner account info by its ID
 */

// This will return a Promise
riot.summoner.getById('SUMMONER-ID')
    .then(summonerDTO => console.log(summonerDTO));
    
```

## More examples
```JS
/**
 * Show player lane statistics
 */

const laneStatisticsReducer = (MatchList) => MatchList.matches.reduce((acc, match) => {
    // Check if the match.lane aready exists in the resulting set, create an entry if not
    // Increment value for corresponding lane entry
    acc[match.lane] = acc[match.lane] === undefined ? 1 : acc[match.lane] + 1;

    return acc;
}, {})

// Get the user account details by account id
riot.summoner.getByName('SUMMONER-NAME')
    // Get last 100 matches info
    .then(Summoner => riot.match.byAccountId(Summoner.accountId))
    // Compute lane statistics from MatchList data
    .then(MatchList => laneStatisticsReducer(MatchList))
    // Log result into the console
    .then(result => console.log(result))
    // Promise error handling
    .catch(({ response }) => console.log(response.data))
```

## More advanced example

```JS
/**
 * Show teams and their players for last player game
 */

const sortSummoners = ({ participantIdentities, participants }) => {
    // Define constant that represents first team in RIOT api
    const TEAM_1 = 100

    // Basic structure of returning object
    const teams = {
        team1: [],
        team2: []
    }

    // Loop through all participants of the match
    participantIdentities.map(({ player: { summonerName } }, idx) => {
        // Add the player to the corresponding team
        participants[idx].teamId === TEAM_1 ? 
            teams.team1.push(summonerName) : teams.team2.push(summonerName);
    })

    return teams;
}

// Print to the console the structure of both teams
const printTeams = (teams) => console.log('Team 1:', teams.team1, 'Team 2:', teams.team2)

// Get account info by summoner name
riot.summoner.getByName('SUMMONER-NAME')
    // Get matches by summoner id
    .then(Summoner => riot.match.byAccountId(Summoner.accountId))
    // Get last 100 matches and sort them by timestamp
    .then(MatchList => MatchList.matches.sort((a, b) => a.timestamp > b.timestamp))
    // Get the most recent match
    .then(sortedMatches => sortedMatches.slice(-1)[0])
    // Get the game details by match.gameId
    .then(mostRecentMatch => riot.match.byMatchId(mostRecentMatch.gameId))
    // Sort summoners based on their teams
    .then(latestMatch => sortSummoners(latestMatch))
    // Print the structure of both teams to the console
    .then(teams => printTeams(teams))
    // Basic error handling
    .catch(error => console.log(error))

```

## Todo
 - [ ] Implement more endpoints
 - [ ] Brush-up project setup (es-lint, unit-tests)
 - [ ] Add Typescript
