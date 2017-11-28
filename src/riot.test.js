const apikey = 'RGAPI-6d626cea-e7ff-4895-a42e-9e462fc0928b';
const riot = require('./riot').default;


describe('Riot object tests', () => {
    test('riot to be defined', () => {
        expect(riot).not.toBeDefined()
    })
    
    test('riot to be inited with api key', () => {
        riot.init(apikey);
    })
    
    test('riot object to have summoner property', () => {
        expect(riot).toHaveProperty('summoner');
    })    
})

describe('Summoner object tests', () => {
    test('function getByName is defined', () => {
        expect(riot.summoner.getByName).toBeDefined();
    })
})

