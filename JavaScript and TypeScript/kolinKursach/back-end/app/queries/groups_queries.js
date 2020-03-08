module.exports.getGroups = async (pool) => {
	let res = await pool.query('SELECT * FROM "Groups" ORDER BY id ASC');
	return res.rows;
};

module.exports.getGroupById = async (pool, id) => {
	let res = await pool.query('SELECT * FROM "Groups" WHERE id = $1', [id]);
	return res.rows;
};

module.exports.createGroup = async (pool, name, group_owner_id) => {
	return await pool.query(`INSERT INTO "Groups" (full_name, group_owner_id) VALUES ($1, $2)`, [name, group_owner_id]);
};

module.exports.modifyGroup = async (pool, id, name, group_owner_id) => {
	await pool.query(`UPDATE "Groups" SET full_name = $1, group_owner_id = $2 WHERE id = $3`, [name, group_owner_id, id]);
};

module.exports.deleteGroupById = async (pool, id) => {
	await pool.query(`DELETE FROM "Groups" WHERE id = $1`, [id]);
};