import MatchDTO from '../Match.dto';
import ParticipantIdentityDTO from '../ParticipantIdentity.dto';
import SummonerAccountDTO from '../SummonerAccount.dto';
import MatchList from '../MatchList.dto';
import MatchReference from '../MatchReference.dto';


export default class DTOFactory {
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