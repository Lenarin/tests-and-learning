const queries = require(`../queries/results_queries`);

module.exports = (app, db) => {
	app.get('/results', async (req, res) => {
		let results = await queries.getResults(db);
		res.json(results);
	});

	app.get('/results/:id', async (req, res) => {
		let result = await queries.getResultById(db, parseInt(req.params.id));
		if (result.length === 0) res.json({ error: "Result not found" });
		else res.json(result);
	});

	app.post('/results', async (req, res) => {
		if (!req.body.variantId || !req.body.userId || !req.body.resultCost) res.json({ error: "Not enough arguments or invalid fields (variantId, userId, resultCost"} );
		try {
			let result = await queries.createResult(db, req.body.variantId, req.body.userId, req.body.resultCost);
			res.json({ res: `Added ${result.rowCount} results` });
		}
		catch (e) {
			res.json(e);
		}
	});

	app.put('/results/:id', async (req, res) => {
		if (!req.body.variantId || !req.body.userId || !req.body.resultCost) res.json({ error: "Not enough arguments or invalid fields (variantId, userId, resultCost"} );
		try {
			await queries.modifyResult(db, parseInt(req.params.id), req.body.variantId, req.body.userId, req.body.resultCost);
			res.json({ res: `Result ${parseInt(req.params.id)} changed` });
		}
		catch (e) {
			res.json(e);
		}
	});

	app.delete('/results/:id', async (req, res) => {
		try {
			await queries.deleteResultById(db, parseInt(req.params.id));
			res.json({ res: `Result ${parseInt(req.params.id)} deleted` });
		}
		catch (e) {
			res.json(e);
		}
	});
};