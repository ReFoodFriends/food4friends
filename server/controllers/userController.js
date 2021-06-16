/* eslint-disable indent */
const db = require('../models/userModels');
const bcrypt = require('bcryptjs');

const userController = {};

userController.addUser = async (req, res, next) => {
  // req.body = { username: 'rabbit', password: 'carrot'}
  const { email, name, password } = req.body;
  const searchQuery = 'SELECT email FROM localuser where email = $1';
  const searchParams = [email];
	console.log('reached here');
  try {
    const { rowCount } = await db.query(searchQuery, searchParams);
    console.log('number of matches in db', rowCount);
    if (rowCount)
      return next({ err: 'error with username found already in db' });
  } catch (e) {
    return next({ err: 'error with searching username in db: ' + e });
  }

  const hashedPass = await bcrypt.hash(password, 5);
  const cookie = email + ' hello cookie';
  // insert into db
  const insertQuery =
    'INSERT INTO localuser (email, name, password, cookie) VALUES ($1, $2, $3, $4)';
  const insertParams = [email, name, hashedPass, cookie];
  // const createTableQuery = `CREATE TABLE ${username}_history(id SERIAL PRIMARY KEY, date varchar NOT NULL, habit_id int NOT NULL, task_id int NOT NULL, description varchar, requirement int, completion int DEFAULT 0, isWeekly int DEFAULT 0, CONSTRAINT fk_habit FOREIGN KEY (habit_id) REFERENCES habit(id) ON DELETE cascade, CONSTRAINT fk_task FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE cascade )`;
  try {
    await db.query(insertQuery, insertParams);
    // await db.query(createTableQuery);
  } catch (e) {
    // fill in error message
    return next({ err: 'error with db query in addUser: ' + e });
  }
  console.log('successfully signuped');
  res.locals.email = email;
  res.cookie('SSID', cookie);
  return next();
};

userController.verifyUser = async (req, res, next) => {
  const { email, password } = req.body;

  const searchQuery = 'SELECT password, cookie FROM localuser where email = $1';
  const searchParams = [email];
  let hashedPass;
  try {
    const { rows } = await db.query(searchQuery, searchParams);
    console.log('return array of obj', rows);
    // [{password: fdashjfksda, cookie: jdfaslk}]
    if (rows.length) hashedPass = rows[0].password;
    else return next({ err: 'cannot find password for some reason ' });
    const passwordMatched = bcrypt.compare(password, hashedPass);
    if (passwordMatched) {
      res.locals.email = email;
      res.cookie('SSID', rows[0].cookie);
    } else {
      return next({ err: 'invalid password' });
    }
    return next();
  } catch (e) {
    return next({ err: 'error with searching for user pass in db: ' + e });
  }
};

userController.loginOrCreateUser = async (req, res, next) => {
	const { name, auth_token, email } = req.body;
	try {
		const existsSql = `SELECT * FROM users WHERE user_auth_token = '${auth_token}'`;
		const results = await db.query(existsSql);
		if (results.rows.length === 0) {
			//user does not exist
			const insertSql = `INSERT INTO users (name, user_auth_token) VALUES ('${name}', '${auth_token}')`;
			const response = await db.query(insertSql);
		}

		res.locals.user = { name, auth_token };
		return next();
	} catch (err) {
		console.log(err);
		return next({
			log: 'Error in userController.loginOrCreateUser',
			message: {
				err: `userController.loginOrCreateUser: ERROR: ${err}`,
			},
		});
	}
};

userController.checkCookie = async (req, res, next) => {
	// console.log('arrive here');
	// console.log(req.cookies);
	const cookie = req.cookies.SSID;
	const searchQuery = 'SELECT email FROM localuser WHERE cookie = $1';
	const searchParams = [cookie];
	try {
		const {rows} = await db.query(searchQuery, searchParams);
		console.log(rows);
		res.locals.email = rows[0].email;
		return next();
	} catch(e) {
		return next({err: 'error at db search for check cookie' + e});
	}
};

// userController.addPost = async (req, res, next) => {
// 	try {
// 		//[category, content, date, creator_id]
// 		const dataArray = [
// 			'brazilian',
// 			'all you can eat with every cut you can imagine!',
// 			new Date(),
// 			2,
// 		];
// 		res.locals.post = await db.query(
// 			'INSERT INTO public.posts (category, content, date, creator_id) VALUES ($1, $2, $3, $4)',
// 			dataArray
// 		);
// 		return next();
// 	} catch (err) {
// 		console.log(err);
// 		return next({
// 			log: 'Error in userController.getUser',
// 			message: {
// 				err: 'userController.getUser: ERROR: failed to find user',
// 			},
// 		});
// 	}
// };

userController.addPost = async (req, res, next) => {
	const { email, category, content } = req.body;
	const date = new Date().toDateString();
	// console.log(date);
	// console.log(typeof date);

	try {
		//[category, content, date, creator_id]
		const insertQuery = 'INSERT INTO posts (category, content, date, creator_id) VALUES ($1, $2, $3, (SELECT id FROM localuser WHERE email = $4))';
		const insertParams = [category, content, date, email];
		res.locals.post = await db.query(insertQuery, insertParams);
		console.log(res.locals.post);
		return next();
	} catch (err) {
		console.log(err);
		return next({
			log: 'Error in userController.getUser',
			message: {
				err: 'userController.getUser: ERROR: failed to find user',
			},
		});
	}
};
// ${req.params.email})

userController.getUserPosts  = async (req, res, next) => {
	const query = 'SELECT category, content, date FROM posts WHERE creator_id=(SELECT id FROM localuser WHERE email = $1)';
	const queryParams = [res.locals.email];
	try{
		const queryRes = await db.query(query, queryParams).catch(err => console.log(err));
		res.locals.userPosts = queryRes.rows;
	return next();
	} catch(err) {
		console.log(err);
		return next({
			log: 'Error in userController.getUserPosts',
			message: {
				err: 'userController.getUserPOsts: ERROR: failed to find posts',
			},
		});
	}
};


//for a logged in user ID, return all posts of users that they follow
userController.getFeed = async (req, res, next) => {
	const { auth_token } = req.body;
	const sql = `SELECT * from posts as a 
	inner join followers as b on a.creator_id = b.user_id
	inner join users as c on b.follower_id = c._id
	WHERE c.user_auth_token = '${auth_token}'`;
	try {
		//querying for all user_ids that have this follower_id
		const results = await db.query(sql);

		if (results.rows.length === 0)
			throw new Error('No results from Posts table');
		res.locals.followedPosts = results.rows;
		return next();
	} catch (err) {
		console.log(err);
		return next({
			log: 'Error in userController.getUser',
			message: {
				err: `userController.getUser: ERROR:${err}`,
			},
		});
	}
};

// userController.searchUsers = async (req, res, next) => {
// 	const {name} = req.body;
// 	const sql = 'select * from users where name like \'%name%\'';
// 	try{
// 		const results = db.query(sql);
// 		res.locals.users = results.rows;
// 	} catch (err) {
// 		console.log(err);
// 		return next({
// 			log: 'Error in userController.findUsers',
// 			message: {
// 				err: `userController.findUsers: ERROR:${err}`,
// 			},
// 		});
// 	}
// };


//! get username not id
// userController.getFollows = async (req, res, next) => {
// 	try {
// 		const { auth_token } = req.body;
// 		//follower_id = current user's id
// 		//querying for all user_ids that have this follower_id
// 		// const data = [3];

// 		const sql = `SELECT DISTINCT user_id FROM followers as a inner join users as b ON a.follower_id = b._id WHERE b.user_auth_token = '${auth_token}'`;
// 		const results = await db.query(sql);
// 		if (!results && results.row.length === 0)
// 			throw new Error('No followers found for user');
// 		res.locals.follows = results.rows;
// 		return next();
// 	} catch (err) {
// 		console.log(err);
// 		return next({
// 			log: 'Error in userController.getUser',
// 			message: {
// 				err: `userController.getUser: ERROR: ${err}`,
// 			},
// 		});
// 	}
// };

//! handle duplicate
// userController.addFollow = async (req, res, next) => {
// 	const { auth_token } = req.body;
// 	try {
// 		if (res.locals.follows) {
// 			res.locals.follows.forEach(row => {
// 				if (row.user_auth_token === auth_token) return next(); //user already follows this person
// 			});
// 		}
// 		//user_id, follower_id
// 		res.locals.follows = await db.query(
// 			'INSERT INTO public.followers (user_id, follower_id) VALUES ($1, $2)',
// 			data
// 		);
// 		return next();
// 	} catch (err) {
// 		console.log(err);
// 		return next({
// 			log: 'Error in userController.getUser',
// 			message: {
// 				err: 'userController.getUser: ERROR: failed to find user',
// 			},
// 		});
// 	}
// };


// userController.likePost = async (req, res, next) => {
// 	try {
// 	} catch (err) {
// 		console.log(err);
// 		return next({
// 			log: 'Error in userController.getUser',
// 			message: {
// 				err: 'userController.getUser: ERROR: failed to find user',
// 			},
// 		});
// 	}
// };

userController.deleteUser = async (req, res, next) => {};

userController.unFavorite = async (req, res, next) => {};

userController.deletePost = async (req, res, next) => {};

module.exports = userController;
