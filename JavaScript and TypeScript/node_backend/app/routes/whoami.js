module.exports = (app, db) => {
    app.get(`/whoami`, (req, res) => {
        res.set('Connection', 'close');
        res.send({ ipaddress: req.ip, language: req.get('Accept-Language'), software: req.get('User-Agent') });
    })
}