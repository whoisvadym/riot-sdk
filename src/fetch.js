import axios from 'axios';
import Config from './config';

const _templateParse = (string, replaceKey, replaceValue) => string.replace(`{${replaceKey}}`, replaceValue)

const _composeUrl = (endpoint, parts) => {
    const keys = Object.keys(parts);

    keys.map((key) => endpoint = _templateParse(endpoint, key, encodeURIComponent(parts[key])))

    return endpoint;
}

const _fetch = function (url) {
    if(!Config.API_KEY) throw new Error('Riot library should be init first')

    return axios.get(Config.END_POINT + url + `?api_key=${Config.API_KEY}`)
}


export default (endpoint, ...args) => _fetch(_composeUrl(endpoint, ...args))
