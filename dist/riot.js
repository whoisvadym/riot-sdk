(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('axios')) :
	typeof define === 'function' && define.amd ? define(['axios'], factory) :
	(global.riot = factory(global.axios));
}(this, (function (axios) { 'use strict';

axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;

const Config = {
    END_POINT: '',
    API_KEY: '',
    setKey: (API_KEY) => {
        Config.API_KEY = API_KEY;
    },
    setEndpoint: (END_POINT) => {
        Config.END_POINT = END_POINT;
    }
};

const _templateParse = (string, replaceKey, replaceValue) => string.replace(`{${replaceKey}}`, replaceValue);

const _composeUrl = (endpoint, parts) => {
    const keys = Object.keys(parts);

    keys.map((key) => endpoint = _templateParse(endpoint, key, encodeURIComponent(parts[key])));

    return endpoint;
};

const _fetch = function (url) {
    if(!Config.API_KEY) throw new Error('Riot library should be init first')

    return axios.get(Config.END_POINT + url + `?api_key=${Config.API_KEY}`)
};


var $http = (endpoint, ...args) => _fetch(_composeUrl(endpoint, ...args));

class SummonerService {

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

class MatchService {
    static byMatchId(matchId) {
        return $http('/lol/match/v3/matches/{matchId}', {matchId}).then(({ data }) => data)
    }
    static byAccountId(accountId) {
        return $http('/lol/match/v3/matchlists/by-account/{accountId}', {accountId}).then(({ data }) => data)
    }
}

//services
const riot = (function ({api_key, endpoint}) {

    // setting up key and endpoint
    Config.setKey(api_key);
    Config.setEndpoint(endpoint);

    return {
        summoner: SummonerService,
        match: MatchService
    }
});

return riot;

})));
