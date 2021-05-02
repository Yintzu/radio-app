const fetch = require("node-fetch");

const getAll = "format=json&pagination=false";

const getChannels = (req, res) => {
    fetch(`http://api.sr.se/api/v2/channels?${getAll}`)
        .then(response => response.json())
        .then(result => res.json(result))
}

const getPrograms = (req, res) => {
    fetch(`http://api.sr.se/api/v2/programs?${getAll}`)
        .then(response => response.json())
        .then(result => res.json(result))
}

const getProgramsById = (req, res) => {
    fetch(`http://api.sr.se/api/v2/episodes/index?programid=${req.params.id}&${getAll}`)
        .then(response => response.json())
        .then(result => res.json(result))
}

module.exports = {
    getChannels,
    getPrograms,
    getProgramsById
}