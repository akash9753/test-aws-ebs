import { HttpError } from "http-errors";
import { v4 as uuidv4 } from "uuid";

export const globalErrorHandler = (
    err,
    req,
    res,
    next,
) => {
    const errorId = uuidv4();

    const statusCode = err.status || 500;
    const isProduction = process.env.NODE_ENV === "production";
    const message = isProduction
        ? `An unexpected error occurred.`
        : err.message;


    res.status(statusCode).json({
        status:false,
        errors: [
            {
                ref: errorId,
                type: err.name,
                msg: message,
                path: req.path,
                location: "server",
                stack: isProduction ? null : err.stack,
            },
        ],
    });
};
