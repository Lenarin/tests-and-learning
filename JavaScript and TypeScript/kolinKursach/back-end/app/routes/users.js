const queries = require(`../queries/user_queries`);

module.exports = (app, db) => {
	app.get('/users', async (req, res) => {
		let users = await queries.getUsers(db);
		res.json(users);
	});

	app.get('/users/:id', async (req, res) => {
		let user = await queries.getUserById(db, parseInt(req.params.id));
		if (user.length === 0) res.json({ error: "User not found" });
		else res.json(user);
	});

	app.post('/users', async (req, res) => {
		if (!req.body.name || !req.body.groupId) res.json({ error: "Not enough arguments or invalid fields (name, groupId"} );
		try {
			let user = await queries.createUser(db, req.body.name, req.body.groupId);
			res.json({ res: `Added ${user.rowCount} users` });
		}
		catch (e) {
			res.json(e);
		}
	});

	app.put('/users/:id', async (req, res) => {
		if (!req.body.name || !req.body.groupId) res.json({ error: "Not enough arguments or invalid fields (name, groupId"} );
		try {
			await queries.modifyUser(db, parseInt(req.params.id), req.body.name, req.body.groupId);
			res.json({ res: `User ${parseInt(req.params.id)} changed` });
		}
		catch (e) {
			res.json(e);
		}
	});

	app.delete('/users/:id', async (req, res) => {
		try {
			await queries.deleteUserById(db, parseInt(req.params.id));
			res.json({ res: `User ${parseInt(req.params.id)} deleted` });
		}
		catch (e) {
			res.json(e);
		}
	});
};