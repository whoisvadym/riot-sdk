export default class MatchReference {
    constructor({ lane, gameId, champion, platformId, season, queue, role, timestamp }) {
        this.lane = lane
        this.gameId = gameId
        this.champion = champion
        this.platformId = platformId
        this.season = season
        this.queue = queue
        this.role = role
        this.timestamp = timestamp
    }
}