const shortener = require(`../logic/url_shortener`);

module.exports = (app, db) => {
    app.post(`/shorturl/new`, async (req, res) => {
        try {
            const doc = await shortener.addNew(req.body.url);
            res.send(doc);
        }
        catch(e) {
            res.send(e);
        }
    })

    app.get(`/shorturl/:url`, async (req, res) => {
        try {
            const doc = await shortener.findByShortUrl(req.params.url);
            res.redirect(`http://${doc.original_url}`);
        }
        catch(e) {
            res.send(e);
        }
    })
}