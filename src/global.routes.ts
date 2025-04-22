import { Router } from "express";
import apiv1 from "./modules/api.routes.ts";
import utilsv1 from "./modules/utils.routes.ts";

// Router destinado a API, com as versões e os endpoints
const router : Router = Router();

router.use("/v1", apiv1);
Object.freeze(router);
export const api = router;

// Router destinado a utilidades, como healthcheck, etc.
const utilsRouter : Router = Router();

utilsRouter.use("/v1", utilsv1);
Object.freeze(utilsRouter);
export const utils = utilsRouter;




