(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('axios')) :
	typeof define === 'function' && define.amd ? define(['axios'], factory) :
	(global.riot = factory(global.axios));
}(this, (function (axios) { 'use strict';

axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;

const Config = {
    END_POINT: 'https://ru.api.riotgames.com',
    API_KEY: '',
    setKey: (API_KEY) => {
        Config.API_KEY = API_KEY;
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

class MatchDTO {
    constructor({seasonId, queueId, gameId, participantIdentities, gameVersion,
                 platformId, gameMode, mapId, gameType, teams, participants,
                 gameDuration, gameCreation}) {
        this.seasonId = seasonId;
        this.queueId = queueId;
        this.gameId = gameId;
        this.participantIdentities = participantIdentities;
        this.gameVersion = gameVersion;
        this.platformId = platformId;
        this.gameMode = gameMode;
        this.mapId = mapId;
        this.gameType = gameType;
        this.teams = teams;
        this.participants = participants;
        this.gameDuration = gameDuration;
        this.gameCreation = gameCreation;
    }
}

class ParticipantIdentityDTO {
    constructor({player, participantId}) {
        this.player = player;
        this.participantId = participantId;
    }
}

class SummonerAccountDTO {
    constructor({ id, accountId, name, profileIconId, revisionDate, summonerLevel }) {
        this.id = id;
        this.accountId = accountId;
        this.name = name;
        this.profileIconId = profileIconId;
        this.revisionDate = revisionDate;
        this.summonerLevel = summonerLevel;
    }
}

function fromList(list, className) {
    return list.map(data => DTOFactory.getDTO(className, data))
}

class MatchList {
    constructor({matches, totalGames, startIndex, endIndex}) {
        this.matches = fromList(matches, 'MatchReference');
        this.totalGames = totalGames;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
    }
}

class MatchReference {
    constructor({ lane, gameId, champion, platformId, season, queue, role, timestamp }) {
        this.lane = lane;
        this.gameId = gameId;
        this.champion = champion;
        this.platformId = platformId;
        this.season = season;
        this.queue = queue;
        this.role = role;
        this.timestamp = timestamp;
    }
}

class DTOFactory {
    static getDTO(value, args) {

        switch(value) {
            /**
             * Summoner dependent DTOs
             */
            case 'SummonerAccount':
                return new SummonerAccountDTO(args)

            /**
             * Matches dependent DTOs
             */
            case 'Match':
                return new MatchDTO(args)
            case 'MatchReference':
                return new MatchReference(args)
            case 'MatchList':
                return new MatchList(args)
            case 'ParticipantIdentity':
                return new ParticipantIdentityDTO(args)
        }
    }
}

class SummonerService {

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

class MatchService {
    static byMatchId(matchId) {
        return $http('/lol/match/v3/matches/{matchId}', {matchId}).then(({ data }) => DTOFactory.getDTO('Match', data))
    }
    static byAccountId(accountId) {
        return $http('/lol/match/v3/matchlists/by-account/{accountId}', {accountId}).then(({ data }) => DTOFactory.getDTO('MatchList', data))
    }
}

//services
const riot = (function (key) {

    // setting up key
    Config.setKey(key);

    return {
        summoner: SummonerService,
        match: MatchService
    }
});

return riot;

})));
