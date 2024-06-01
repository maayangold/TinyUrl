import express from "express";
import LinksController from '../controllers/linkController.js';

const linksRouter = express.Router();

linksRouter.get('/', LinksController.getLinks);
linksRouter.get('/:id', LinksController.getLinkById);
linksRouter.post('/', LinksController.createLink);
linksRouter.put('/:id', LinksController.updateLink);
linksRouter.delete('/:id', LinksController.deleteLink);
// Redirect
router.get('/redirect/:id', LinksController.redirectLink);

export default LinksRouter;
