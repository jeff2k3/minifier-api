import express from 'express';
import { MinifierController } from '../controllers/minifier.controller.js';
import validateRequest from '../middlewares/validateRequest.js';
import minifierSchema from '../validators/minifier.schema.js';

const router = express.Router();

router.post('/minify/js', validateRequest(minifierSchema), MinifierController.minify_js);
router.post('/minify/css', validateRequest(minifierSchema), MinifierController.minify_css);
router.post('/minify/html', validateRequest(minifierSchema), MinifierController.minify_html);

export default router;