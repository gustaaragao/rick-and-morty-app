import { login } from "../routes/db-jsonserver/login";
import { register } from "../routes/db-jsonserver/register";
import { favorites } from "../routes/db-jsonserver/favorites";
import { users } from "../routes/db-jsonserver/users";

export const dbRouter = {
    login,
    register,
    favorites,
    users
}