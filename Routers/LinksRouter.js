import express from "express";
import LinksController from "../Controllers/LinksController.js";

const LinksRouter = express.Router();

LinksRouter.get('/', LinksController.getLinks);
LinksRouter.get('/:id', LinksController.getLinkById);
LinksRouter.post('/', LinksController.createLink);
LinksRouter.put('/:id', LinksController.updateLink);
LinksRouter.delete('/:id', LinksController.deleteLink);

export default LinksRouter;
// http://localhost:3000/