import express from "express";
import UsersController from '../controllers/UsersController.js';

const UsersRouter = express.Router();

UsersRouter.get('/', UsersController.getUsers);
UsersRouter.get('/:id', UsersController.getUserById);
UsersRouter.post('/', UsersController.createUser);
UsersRouter.put('/:id', UsersController.updateUser);
UsersRouter.delete('/:id', UsersController.deleteUser);

export default UsersRouter;
