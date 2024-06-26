import { Router } from "express";
import { privateRoute } from "../config/passport";

import * as ApiController from "../controllers/api.controller";

const router = Router();

router.get('/ping', ApiController.ping);

router.post('/register', ApiController.register);
router.post('/login', ApiController.login);

router.get('/list', privateRoute, ApiController.list);

export default router;