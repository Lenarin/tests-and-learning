const queries = require(`../queries/groups_queries`);

module.exports = (app, db) => {
	app.get('/groups', async (req, res) => {
		let groups = await queries.getGroups(db);
		res.json(groups);
	});

	app.get('/groups/:id', async (req, res) => {
		let group = await queries.getGroupById(db, parseInt(req.params.id));
		if (group.length === 0) res.json({ error: "Group not found" });
		else res.json(group);
	});

	app.post('/groups', async (req, res) => {
		if (!req.body.name || !req.body.groupOwnerId) res.json({ error: "Not enough arguments or invalid fields (name, groupOwnerId"} );
		try {
			let user = await queries.createGroup(db, req.body.name, req.body.groupOwnerId);
			res.json({ res: `Added ${user.rowCount} groups` });
		}
		catch (e) {
			res.json(e);
		}
	});

	app.put('/groups/:id', async (req, res) => {
		if (!req.body.name || !req.body.groupOwnerId) res.json({ error: "Not enough arguments or invalid fields (name, groupOwnerId"} );
		try {
			await queries.modifyGroup(db, parseInt(req.params.id), req.body.name, req.body.groupOwnerId);
			res.json({ res: `Group ${parseInt(req.params.id)} changed` });
		}
		catch (e) {
			res.json(e);
		}
	});

	app.delete('/groups/:id', async (req, res) => {
		try {
			await queries.deleteGroupById(db, parseInt(req.params.id));
			res.json({ res: `Group ${parseInt(req.params.id)} deleted` });
		}
		catch (e) {
			res.json(e);
		}
	});
};