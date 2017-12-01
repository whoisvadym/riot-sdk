# Lightweight RIOT API SDK written specially for Node.js

## Installations
`npm install riot-sdk`

or:

`yarn add riot-sdk`

## Preparations

```JS
//Import package
import riot from 'riot-sdk';

//Init sdk using your credentials
const sdk = riot({
    api_key: 'YOUR-API-KEY', 
    endpoint: 'YOUR-ENDPOINT' //For instance: https://ru.api.riotgames.com
})


//OR
const sdk = require('riot-sdk');
const riot = sdk({
    api_key: 'YOUR-API-KEY', 
    endpoint: 'YOUR-ENDPOINT'
})

//OR
const riot = require('riot-sdk')({
    api_key: 'YOUR-API-KEY', 
    endpoint: 'YOUR-ENDPOINT'
})

```

## Simple usage

```JS
/**
 * Recieve summoner account info by its ID
 */

//this will return a Promise
riot.summoner.getById('SUMMONER-ID')
    .then(summonerDTO => console.log(summonerDTO))
    
```

## More examples
```JS
/**
 * Show player lane statistic
 */

const metricAlgorithm = (MatchList) =>  MatchList.matches.reduce((acc, match) => {
    //check if we have lane as a property already. If we don't - create one.
    if(!acc.hasOwnProperty(match.lane)) acc[match.lane] = 0;
    //increment value for corresponding lane
    acc[match.lane]++;
    //return current accomulated value
    return acc;
}, {})

//Get account details by summoner name
riot.summoner.getByName('SUMMONER-NAME')
    //Get last 100 matches info
    .then(Summoner => riot.match.byAccountId(Summoner.accountId))
    //Perform counting
    .then(MatchList => metricAlgorithm(MatchList))
    //Log result into the console
    .then(result => console.log(result))
    //Promise error handling
    .catch(({ response }) => console.log(response.data))
```

## More advanced example

```JS
/**
 * Show teams and their players for last player game
 */

const sortSummoners = ({ participantIdentities, participants }) => {
    //Define constant that represents first team in RIOT api
    const TEAM_1 = 100

    //Basic structure of returning object
    const teams = {
        team1: [],
        team2: []
    }

    //Loop through all participants (read players) of the match
    participantIdentities.map(({ player: { summonerName } }, idx) => {
        //Check if player belongs to Team 1 and add him to team1
        //Add him to team 2 otherwise
        participants[idx].teamId === TEAM_1 ? 
            teams.team1.push(summonerName) : teams.team2.push(summonerName);
    })

    return teams;
}

//Print to the console the structure of both teams
const printTeams = (teams) => console.log('Team 1:', teams.team1, 'Team 2:', teams.team2)

//Get account info by summoner name
riot.summoner.getByName('SUMMONER-NAME')
    //Get matches by summoner id
    .then((Summoner) => riot.match.byAccountId(Summoner.accountId))
    //Get last 100 matches and sort them by playing time
    .then((MatchList) => MatchList.matches.sort((a, b) => a.timestamp > b.timestamp))
    //Get the latest match
    .then((sortedMatches) => riot.match.byMatchId(sortedMatches.slice(-1)[0].gameId))
    //Sort summoners based on their teams
    .then((latestMatch) => sortSummoners(latestMatch))
    //Print the structure of both teams to the console
    .then((teams) => printTeams(teams))
    //Basic error handling
    .catch(error => console.log(error))

```

## Todo
 - [ ] Advanced error handling
 - [ ] Add implementation for more endpoints