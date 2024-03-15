import express,{Request,Response} from 'express'
import { createUserController } from '../controllers/userControllers';
const router = express.Router();
router.get("/", (req:Request, res:Response) => {
    res.send("Hello User orutes")
});
router.post("/create-user",createUserController)
export default router;