import { Router } from "express";
import { customerLogin, customerSave, customerUpdate } from "../controllers/customer.controller.js";
import { checkCus } from "../middlewares/checkCus.js";

const router = Router();

router.post("/", customerSave)
router.put("/:id", customerUpdate)
router.post("/login", customerLogin)
router.get("/profile",checkCus,async (req,res) => {
    const customer = req.customer;
    res.json({ ...customer })
})

export default router;