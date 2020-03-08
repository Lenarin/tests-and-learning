module.exports.getUsers = async (pool) => {
	let res = await pool.query('SELECT * FROM "Users" ORDER BY id ASC');
	return res.rows;
};

module.exports.getUserById = async (pool, id) => {
	let res = await pool.query('SELECT * FROM "Users" WHERE id = $1', [id]);
	return res.rows;
};

module.exports.createUser = async (pool, name, group_id) => {
	let res = await pool.query(`INSERT INTO "Users" (full_name, group_id) VALUES ($1, $2)`, [name, group_id]);
	return res;
};

module.exports.modifyUser = async (pool, id, name, group_id) => {
	let res = await pool.query(`UPDATE "Users" SET full_name = $1, group_id = $2 WHERE id = $3`, [name, group_id, id]);
	return res;
};

module.exports.deleteUserById = async (pool, id) => {
	let res = await pool.query(`DELETE FROM "Users" WHERE id = $1`, [id]);
	return res;
};