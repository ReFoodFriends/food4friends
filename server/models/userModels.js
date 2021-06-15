const { Pool } = require('pg');

const PG_URI =
	'postgres://tnxzbzep:FP-ZLHqR8FQypTJ-wAGFQZwvmnDC5zCs@batyr.db.elephantsql.com/tnxzbzep';

const pool = new Pool({
	connectionString: PG_URI,
});

module.exports = {
	query: (text, params, callback) => {
		console.log('executed query', text);
		return pool.query(text, params, callback);
	},
};
