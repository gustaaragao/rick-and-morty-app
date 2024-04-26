import { dbRouter } from "./routing/routers/dbRouter";
import { ramRouter } from "./routing/routers/ramRouter";

export const apiRouter = {
    dbRouter,
    ramRouter
}