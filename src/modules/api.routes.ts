import { Router } from "express";
import contractsRouter from "./contracts/contracts.routes.ts";
import usersRouter from "./users/users.routes.ts";
import propertiesRouter from "./properties/properties.routes.ts";
import rolesRouter from "./roles/roles.routes.ts";
import rentsRouter from "./rents/rents.routes.ts";

const router = Router();

router.use("/contracts", contractsRouter);
router.use("/users", usersRouter);
router.use("/properties", propertiesRouter);
router.use("/roles", rolesRouter);
router.use("/rents", rentsRouter);

export default router;



