import { Router } from "express";
import { saveUser, loginUser, profileUser } from "../controllers/auth.controllers.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = Router();

router.post('/register', saveUser);
router.post('/login',loginUser)
router.get('/profile',checkAuth,profileUser);


export default router;