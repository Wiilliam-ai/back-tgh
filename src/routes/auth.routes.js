import { Router } from "express";
import { saveUser, loginUser, profileUser, updateUser } from "../controllers/auth.controllers.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = Router();

router.post('/', saveUser);
router.put('/:id',updateUser)
router.post('/login',loginUser)
router.get('/profile',checkAuth,profileUser);


export default router;