const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// router.get('/', (req, res) => {
// 	return res.status(200).json();
// });
router.post('/signup', userController.addUser, (req, res) =>
  res.status(200).json({ email: res.locals.email, name: res.locals.name })
);

router.post('/login', userController.verifyUser, userController.getUserPosts, (req, res) =>
  res.status(200).json({ email: res.locals.email, posts: res.locals.userPosts, name: res.locals.name })
);

router.get('/verifyWithCookie', userController.checkCookie, userController.getUserPosts, (req, res) => {
  return res.status(200).json({ email: res.locals.email, posts: res.locals.userPosts, name: res.locals.name });
});

router.get('/findPeople/:name/:email', userController.findPeople, (req, res) => {
  return res.status(200).json({alreadyFollow: res.locals.alreadyFollow});
});

router.get('/getFollowPosts/:email', userController.getFollowPosts, (req, res) => {
  return res.status(200).json(res.locals.followPosts);
});

router.get('/checkFollow/:followee/:follower', userController.checkFollow, (req, res) =>{
  return res.status(200).json({ result: res.locals.result});
})

router.post('/followUser', userController.followUser, (req, res) => {
  return res.status(200).send('successful following');
});

router.put('/unfollowUser', userController.unfollowUser, (req, res) => {
  return res.status(200).send('sucessful unfollowing');
});

router.get('/login', userController.loginOrCreateUser, (req, res) =>
  res.status(200).json(res.locals.user)
);

router.post('/post', userController.addPost, userController.getUserPosts, (req, res) =>
  res.status(200).json({ posts: res.locals.userPosts })
);

router.get('/user-posts/:email', userController.getUserPosts, (req, res) =>
  res.status(200).json(res.locals.userPosts)
);

// router.get('/getFeed', userController.getFeed, (req, res) =>
//   res.status(200).json(res.locals.followedPosts)
// );

// router.post('/searchUsers', userController.searchUsers, (req, res) =>
//   res.status(200).json(res.locals.users)
// );

// router.post(
//   '/followSomeone',
//   userController.getFollows,
//   userController.addFollow,
//   (req, res) => res.status(200).json(res.locals.follows)
// );

//followed posts
//only personal posts

module.exports = router;
