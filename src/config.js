const Config = {
    END_POINT: '',
    API_KEY: '',
    setKey: (API_KEY) => {
        Config.API_KEY = API_KEY
    },
    setEndpoint: (END_POINT) => {
        Config.END_POINT = END_POINT
    }
}

export default Config;