import supertest from 'supertest';
import app from './server.js';




// might be able to use something similar to this to test login
// request(app)
//   .get('/user')
//   .expect('Content-Type', /json/)
//   .expect('Content-Length', '15')
//   .expect(200)
//   .end(function(err, res) {
//     if (err) throw err;
//   });

// maybe we could start simple with expecting login to be turned to true on successful login
// .expect(loggedIn, 'true')
// .expect(res.locals.email, 'umair@gmail.com')
// 
//i think thats for backend? but ill look into it and see whats going on
// mock http might be a good way to go, like Frank said