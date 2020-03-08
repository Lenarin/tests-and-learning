module.exports = (app, db) => {
    app.get(`/timestamp/:date_string?`, (req, res) => {
        let date;
        if (req.params.date_string) date = new Date(req.params.date_string)
        else date = new Date();

        res.send({"unix": date.getTime(), "utc": date.toUTCString()});
    })
}