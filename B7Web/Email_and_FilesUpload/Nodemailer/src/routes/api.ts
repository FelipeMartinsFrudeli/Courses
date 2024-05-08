import { Router } from "express";

import * as EmailController from "../controllers/email.controller";
import * as ApiController from "../controllers/api.controller";

const router = Router();

router.get('/ping', ApiController.ping);
router.post('/contato', EmailController.contato);

export default router;