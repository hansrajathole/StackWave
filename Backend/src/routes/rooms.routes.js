import { Router } from "express";
import { protectRoute } from "../middleware/protected.js"
import * as roomController from '../controllers/rooms.controller.js'

const router = Router()

router.post("/", protectRoute , roomController.createRoom)
router.get("/",protectRoute , roomController.getAllRoom)
router.patch("/:roomId",protectRoute, roomController.joinRoomById)
router.get("/:roomId", protectRoute , roomController.getRoomById)
router.delete("/:roomId", protectRoute, roomController.deleteRoom)



export default router