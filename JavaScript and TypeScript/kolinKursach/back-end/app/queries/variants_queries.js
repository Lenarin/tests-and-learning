let exercises_query = require('./exercises_queries');


module.exports.getVariants = async (pool) => {
	let res = await pool.query('SELECT * FROM "ExVars" e LEFT JOIN "Exercises" es ON e.ex_id = es.id RIGHT JOIN "Variants" t1 ON t1.id = e.var_id');
	return res.rows;
};

module.exports.getVariantById = async (pool, id) => {
	//let res = await pool.query('SELECT * FROM "Variants" WHERE id = $1', [id]);
	let exercises = await pool.query(`SELECT * FROM (SELECT * FROM "Variants" WHERE id = $1) t1 JOIN "ExVars" e ON t1.id = e.var_id JOIN "Exercises" es ON e.ex_id = es.id`, [id]);
	return exercises.rows;
};

module.exports.createVariant = async (pool, exercises) => {
	let exes = await exercises_query.getExercisesByIds(pool, exercises);
	let totalCost = 0;
	exes.forEach((obj, idx) => totalCost += obj.cost);
	let res = await pool.query(`INSERT INTO "Variants" (total_cost) VALUES ($1) RETURNING *`, [totalCost]);
	let placeholder = exes.map((obj, idx) => `(${obj.id}, ${res.rows[0].id})`);
	res = await pool.query(`INSERT INTO "ExVars" (ex_id, var_id) VALUES ${placeholder.join(', ')}`);
	return res;
};

module.exports.modifyVariant = async (pool, id, totalCost) => {
	let res = await pool.query(`UPDATE "Variants" SET total_cost = $1 WHERE id = $2`, [totalCost, id]);
	return res;
};

module.exports.deleteVariantById = async (pool, id) => {
	let res = await pool.query(`DELETE FROM "Variants" WHERE id = $1`, [id]);
	return res;
};