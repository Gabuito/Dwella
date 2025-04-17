import { Router } from "express";
import { type DatabaseCheck as TypeResponseDatabase, isDatabaseOnline } from "../shared/utils/health.utils.ts";

const router = Router();

router.get("/health", (_: any, res: any) => {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try{

    const verifyStatus: [{name: string, fn: Function}] = [
      { name: "Database", fn: isDatabaseOnline },
    ]

    verifyStatus.forEach(async (status) => {
      status.fn()
      .then((result: TypeResponseDatabase) => {
        if (result.online) {
          res.write(`data: ${JSON.stringify({ [status.name]: result })}\n\n`);
        }})
      .catch((error: Error) => {
        res.write(`data: ${JSON.stringify({ [status.name]: { online: false, message: error.message } })}\n\n`);
      } );
    });

  }catch(error){
    const errorMessage = (error instanceof Error) ? error.message : String(error);
    res.write(`data: ${JSON.stringify({ error: errorMessage })}\n\n`);
  }
  finally {
    
  };
  res.end("");
}
);

export default router;