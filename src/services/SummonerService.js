import $http from '../fetch';
import DTOFactory from '../DTO/factory/DTOFactory';

export default class SummonerService {

    static getByName(name) {
        return $http('/lol/summoner/v3/summoners/by-name/{name}', {name}).then(({ data }) => DTOFactory.getDTO('SummonerAccount', data))
    }

    static getById(summonerId) {
        return $http('/lol/summoner/v3/summoners/{summonerId}', {summonerId}).then(({ data }) => DTOFactory.getDTO('SummonerAccount', data))
    }

    static getByAccountId(accountId) {
        return $http('/lol/summoner/v3/summoners/by-account/{account-id}', {accountId}).then(({ data }) => DTOFactory.getDTO('SummonerAccount', data))
    }
}