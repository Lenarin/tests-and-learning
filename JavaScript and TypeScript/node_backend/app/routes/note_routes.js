
module.exports =  (app, db) => {
    const noteSchema = new db.Schema({
        body: String,
        title: String
    })
    
    const Note = db.model('Note', noteSchema);

    app.put(`/notes/:id`, (req, res) => {
        Note.findByIdAndUpdate(req.params.id, { title: req.body.title, body: req.body.body }, { new: true }, (err, item) => {
            if (err) res.send({ error: err});
            res.send(item);
        })
    })

    app.delete(`/notes/:id`, (req, res) => {
        Note.findByIdAndDelete(req.params.id, (err, item) => {
            if (err) res.send({ error: err });
            res.send(item);
        })
    })

    app.get(`/notes/:id`, (req, res) => {
        Note.findById(req.params.id, (err, item) => {
            if (err) res.send({ error: err });
            res.send(item || { error: "Id not found"});
        })
    })

    app.post(`/notes`, (req, res) => {
        if (!req.body.title || !req.body.body) return res.send({ error: "Not enought info!" });

        const note = new Note({ title: req.body.title, body: req.body.body });
        note.save((err, doc) => {
            if (err) return res.send({ error: err });
            res.send(doc);
        });
    });
};