import fromList from "./factory/FromList";

export default class MatchList {
    constructor({matches, totalGames, startIndex, endIndex}) {
        this.matches = fromList(matches, 'MatchReference')
        this.totalGames = totalGames
        this.startIndex = startIndex
        this.endIndex = endIndex
    }
}