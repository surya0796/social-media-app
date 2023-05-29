import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("hello users");
});

export default router;
