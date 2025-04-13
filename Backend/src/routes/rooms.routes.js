import { Router } from "express";
import { protectRoute } from "../middleware/protected.js"
import * as roomController from '../controllers/rooms.controller.js'

const router = Router()

router.post("/", protectRoute , roomController.createRoom)
router.get("/",protectRoute , roomController.getAllRoom)
router.get("/:roomId", protectRoute ,function(req,res){res.send(" Get room info")})



export default router