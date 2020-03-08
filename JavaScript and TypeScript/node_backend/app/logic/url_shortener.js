const mongoose = require('mongoose');
const dns = require(`dns`);

const urlSchema = new mongoose.Schema({
    original_url: String,
    short_url: String
})

const Url = mongoose.model('Url', urlSchema);

exports.addNew = async function(url) {
    return new Promise((resolve, reject) => {
        dns.lookup(url, (err, adress, family) => {
            if (err) return reject({ error: `Wrong URL!` });
            
            Url.estimatedDocumentCount((err, number) => {
                if (err) return reject({ error: err });
                const newUrl = new Url({ original_url: url, short_url: number + 1 });
                newUrl.save((err, doc) => {
                    if (err) return reject({ error: err });
                    return resolve(doc);
                })
            })
        });
    });
};

exports.findByShortUrl = async function(url) {
    return new Promise((resolve, reject) => {
        Url.findOne({short_url: url}, (err, doc) => {
            if (err) return reject({error: err});
            return resolve (doc);
        })
    })
}
