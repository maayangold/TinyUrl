import express from "express";
import UsersController from '../controllers/userController.js';

const usersRouter = express.Router();

usersRouter.get('/', UsersController.getUsers);
usersRouter.get('/:id', UsersController.getUserById);
usersRouter.post('/', UsersController.createUser);
usersRouter.put('/:id', UsersController.updateUser);
usersRouter.delete('/:id', UsersController.deleteUser);

export default UsersRouter;
