
import createHttpError from "http-errors";

export const canAccess = (roles) => {
    return (req, res, next) => {
        const _req = req;
        const roleFromToken = _req.auth.role;

        if (!roles.includes(roleFromToken)) {
            const error = createHttpError(
                403,
                "You don't have enough permissions",
            );

            next(error);
            return;
        }
        next();
    };
};
