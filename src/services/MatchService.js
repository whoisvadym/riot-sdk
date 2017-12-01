import $http from '../fetch';

export default class MatchService {
    static byMatchId(matchId) {
        return $http('/lol/match/v3/matches/{matchId}', {matchId}).then(({ data }) => data)
    }
    static byAccountId(accountId) {
        return $http('/lol/match/v3/matchlists/by-account/{accountId}', {accountId}).then(({ data }) => data)
    }
}