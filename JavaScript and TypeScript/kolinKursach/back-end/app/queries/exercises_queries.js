// Exercises types are: test, esse, quest, interview

const exercise_types = {
	test: 'test',
	esse: 'esse',
	quest: 'quest',
	interview: 'interview'
};

module.exports.exercise_types = exercise_types;

module.exports.getExercises = async (pool) => {
	let res = await pool.query('SELECT * FROM "Exercises" ORDER BY id ASC');
	return res.rows;
};

module.exports.getExerciseById = async (pool, id) => {
	let res = await pool.query('SELECT * FROM "Exercises" WHERE id = $1', [id]);
	return res.rows;
};

module.exports.getExercisesByIds = async (pool, ids) => {
	ids = ids.split(',');
	let res = await pool.query('SELECT * FROM "Exercises" WHERE id = ANY ($1)', [ids]);
	return res.rows;
};

module.exports.createExercise = async (pool, title, text, type, cost, variants) => {
	let res = await pool.query(`INSERT INTO "Exercises" (title, text, type, cost, variants) VALUES ($1, $2, $3, $4, $5)`, [title, text, type, cost, variants]);
	return res;
};

module.exports.modifyExercise = async (pool, id, title, text, type, cost, variants) => {
	let res = await pool.query(`UPDATE "Exercises" SET title = $1, text = $2, type = $3, cost = $4, variants = $5 WHERE id = $6`, [title, text, type, cost, variants, id]);
	return res;
};

module.exports.deleteExerciseById = async (pool, id) => {
	let res = await pool.query(`DELETE FROM "Exercises" WHERE id = $1`, [id]);
	return res;
};