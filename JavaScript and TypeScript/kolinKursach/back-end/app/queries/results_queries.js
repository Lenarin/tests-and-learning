module.exports.getResults = async (pool) => {
	let res = await pool.query('SELECT * FROM "Results" ORDER BY id ASC');
	return res.rows;
};

module.exports.getResultById = async (pool, id) => {
	let res = await pool.query('SELECT * FROM "Results" WHERE id = $1', [id]);
	return res.rows;
};

module.exports.createResult = async (pool, variantId, userId, resultCost) => {
	return await pool.query(`INSERT INTO "Results" (var_id, user_id, res_cost) VALUES ($1, $2, $3)`, [variantId, userId, resultCost]);
};

module.exports.modifyResult = async (pool, id, variantId, userId, resultCost) => {
	await pool.query(`UPDATE "Results" SET var_id = $1, user_id = $2, res_cost = $3 WHERE id = $4`, [variantId, userId, resultCost, id]);
};

module.exports.deleteResultById = async (pool, id) => {
	await pool.query(`DELETE FROM "Results" WHERE id = $1`, [id]);
};