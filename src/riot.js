import Config from './config';

//services
import SummonerService from './services/SummonerService';
import MatchService from './services/MatchService';

const riot = (function ({api_key, endpoint}) {

    // setting up key and endpoint
    Config.setKey(api_key);
    Config.setEndpoint(endpoint);

    return {
        summoner: SummonerService,
        match: MatchService
    }
});

export default riot;