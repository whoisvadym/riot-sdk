import $http from '../fetch';

export default class SummonerService {

    static getByName(name) {
        return $http('/lol/summoner/v3/summoners/by-name/{name}', {name}).then(({ data }) => data)
    }

    static getById(summonerId) {
        return $http('/lol/summoner/v3/summoners/{summonerId}', {summonerId}).then(({ data }) => data)
    }

    static getByAccountId(accountId) {
        return $http('/lol/summoner/v3/summoners/by-account/{account-id}', {accountId}).then(({ data }) => data)
    }
}