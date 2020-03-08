const queries = require(`../queries/variants_queries`);

module.exports = (app, db) => {
	app.get('/variants', async (req, res) => {
		let variant = await queries.getVariants(db);
		res.json(variant);
	});

	app.get('/variants/:id', async (req, res) => {
		let variant = await queries.getVariantById(db, parseInt(req.params.id));
		if (variant.length === 0) res.json({ error: "Variant not found" });
		else res.json(variant);
	});

	app.post('/variants', async (req, res) => {
		if (!req.body.exercises) res.json({ error: "Not enough arguments or invalid fields (exercises)"} );
		try {
			let exercise = await queries.createVariant(db, req.body.exercises);
			res.json({ res: `Added ${exercise.rowCount} variants` });
		}
		catch (e) {
			res.json(e);
		}
	});

	app.put('/variants/:id', async (req, res) => {
		if (!req.body.title || !req.body.text || !req.body.type || !req.body.cost || !req.body.variants) res.json({ error: "Not enough arguments or invalid fields (title, text, type, cost, variants)"} );
		try {
			await queries.modifyVariant(db, parseInt(req.params.id), req.body.title, req.body.text, req.body.type, req.body.cost, req.body.variants);
			res.json({ res: `Exercise ${parseInt(req.params.id)} changed` });
		}
		catch (e) {
			res.json(e);
		}
	});

	app.delete('/variants/:id', async (req, res) => {
		try {
			await queries.deleteVariantById(db, parseInt(req.params.id));
			res.json({ res: `Exercise ${parseInt(req.params.id)} deleted` });
		}
		catch (e) {
			res.json(e);
		}
	});
};