const users = require(`./routes/users`);
const exercises = require(`./routes/exercises`);
const groups = require(`./routes/groups`);
const results = require(`./routes/results`);
const variants = require(`./routes/variants`);

module.exports = (app, db) => {
	app.get('/', (req, res) => {
		res.send("Exerciser TM");
	});

	users(app, db);
	exercises(app, db);
	groups(app, db);
	results(app, db);
	variants(app, db);
};