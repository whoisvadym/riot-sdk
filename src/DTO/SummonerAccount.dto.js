export default class SummonerAccountDTO {
    constructor({ id, accountId, name, profileIconId, revisionDate, summonerLevel }) {
        this.id = id;
        this.accountId = accountId;
        this.name = name;
        this.profileIconId = profileIconId;
        this.revisionDate = revisionDate;
        this.summonerLevel = summonerLevel;
    }
}