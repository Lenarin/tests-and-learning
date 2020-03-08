const queries = require(`../queries/exercises_queries`);

module.exports = (app, db) => {

	app.get('/exercises', async (req, res) => {
		let exercise = await queries.getExercises(db);
		res.json(exercise);
	});

	app.get('/exercises/:id', async (req, res) => {
		let exercise = await queries.getExerciseById(db, parseInt(req.params.id));
		if (exercise.length === 0) res.json({ error: "Exercise not found" });
		else res.json(exercise);
	});

	app.get('/exercises', async (req, res) => {
		try {
			let exercise = await queries.getExercisesByIds(db, req.body.ids);
			if (exercise.length === 0) res.json({error: "Exercises not found"});
			else res.json(exercise);
		}
		catch (e) {
			res.json(e);
		}
	});

	app.post('/exercises', async (req, res) => {
		if (!req.body.title || !req.body.text || !req.body.type || !req.body.cost || !req.body.variants) res.json({ error: "Not enough arguments or invalid fields (title, text, type, cost, variants)"} );
		try {
			let exercise = await queries.createExercise(db, req.body.title, req.body.text, req.body.type, req.body.cost, req.body.variants);
			res.json({ res: `Added ${exercise.rowCount} exercises` });
		}
		catch (e) {
			res.json(e);
		}
	});

	app.put('/exercises/:id', async (req, res) => {
		if (!req.body.title || !req.body.text || !req.body.type || !req.body.cost || !req.body.variants) res.json({ error: "Not enough arguments or invalid fields (title, text, type, cost, variants)"} );
		try {
			await queries.modifyExercise(db, parseInt(req.params.id), req.body.title, req.body.text, req.body.type, req.body.cost, req.body.variants);
			res.json({ res: `Exercise ${parseInt(req.params.id)} changed` });
		}
		catch (e) {
			res.json(e);
		}
	});

	app.delete('/exercises/:id', async (req, res) => {
		try {
			await queries.deleteExerciseById(db, parseInt(req.params.id));
			res.json({ res: `Exercise ${parseInt(req.params.id)} deleted` });
		}
		catch (e) {
			res.json(e);
		}
	});
};