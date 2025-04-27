import { Router, type Request, type Response } from "express";

const router : Router = Router();

router.get("/health", (_: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.status(200).send("OK\n");
}
);

export default router;