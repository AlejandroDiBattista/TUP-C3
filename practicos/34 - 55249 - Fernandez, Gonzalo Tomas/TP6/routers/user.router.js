// user.router.js

import express from 'express';
import User from '../controllers/user.controller.js';

const router = express.Router();

router.get('/users', User.geting);
router.post('/register', User.register);
router.put('/login', User.login);
router.put('/logout', User.valueUser, User.logout);
router.get('/info', User.valueUser, User.info);

export default router;