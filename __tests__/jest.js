import { Login } from './client/src/components/login';
import { SignupScreen } from './client/src/components/Signup';
// Mock axios, else you will really request the endpoint

import axios from 'axios';
const signupSubmitHandler = require('./client/src/components/SignUp.js');
jest.mock('axios');

//const getFirstAlbumTitle = require("./index");

it("returns the email and password if newUser", async () => {
  const newUser = axios.get.mockResolvedValue({email: "umair@gmail.com", password: 1234})
  const result = await signupSubmitHandler(newUser); // Run the function
  expect(result).toEqual({email, password}); // Make an assertion on the result
});

// describe('Login tests', () => {
//   describe('login function', () => {
//     const email = 'test@test.com';
//     //const name = 'test user';
//     const password = 'password';

//     beforeEach(() => {
//       /*
//        * Not necessary for the moment, but will be useful
//        * to test successful & error response
//        */
//       axios.post.mockResolvedValue({});
//     });

//     it('should call endpoint with given email & password', async () => {
//       await login(email, password);
//       expect(axios.post).toBeCalledWith(
//         'postgres://tnxzbzep:FP-ZLHqR8FQypTJ-wAGFQZwvmnDC5zCs@batyr.db.elephantsql.com/tnxzbzep',
//         { user: { email, password } },
//       );
//     });
//   });
// });

// test('async test', async () => {
//   const asyncMock = jest.fn().mockResolvedValue(43);

//   await asyncMock(); // 43
// });