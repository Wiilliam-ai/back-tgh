import { Router } from "express";
import { checkCus } from "../middlewares/checkCus.js";
import { createProject, listProject } from "../controllers/projects.controller.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = Router();

router.post('/projects',checkAuth,createProject)
router.get('/projects',checkCus,listProject)

export default router;