const noteRoutes = require(`./note_routes`);
const timeStamp = require(`./timestamp`);
const whoami = require(`./whoami`);
const urlShortener = require(`./url_shortener`);

module.exports = (app, db) => {
    noteRoutes(app, db);
    timeStamp(app, db);
    whoami(app, db);
    urlShortener(app, db);
}