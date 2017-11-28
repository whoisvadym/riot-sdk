export default class MatchDTO {
    constructor({seasonId, queueId, gameId, participantIdentities, gameVersion,
                 platformId, gameMode, mapId, gameType, teams, participants,
                 gameDuration, gameCreation}) {
        this.seasonId = seasonId
        this.queueId = queueId
        this.gameId = gameId
        this.participantIdentities = participantIdentities
        this.gameVersion = gameVersion
        this.platformId = platformId
        this.gameMode = gameMode
        this.mapId = mapId
        this.gameType = gameType
        this.teams = teams
        this.participants = participants
        this.gameDuration = gameDuration
        this.gameCreation = gameCreation
    }
}