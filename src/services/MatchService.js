import $http from '../fetch';
import DTOFactory from '../DTO/factory/DTOFactory';

export default class MatchService {
    static byMatchId(matchId) {
        return $http('/lol/match/v3/matches/{matchId}', {matchId}).then(({ data }) => DTOFactory.getDTO('Match', data))
    }
    static byAccountId(accountId) {
        return $http('/lol/match/v3/matchlists/by-account/{accountId}', {accountId}).then(({ data }) => DTOFactory.getDTO('MatchList', data))
    }
}