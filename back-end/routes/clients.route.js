import { Router } from "express";
import controller from "../controllers/client.controller.js";
import validateClient from "../middlewares/client.middleware.js";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validateClient, controller.create);
router.put("/:id", validateClient, controller.update);
router.delete("/:id", controller.remove);

export default router;
