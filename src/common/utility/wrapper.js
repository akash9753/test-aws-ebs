
import createHttpError from "http-errors";

// export const asyncWrapper = (requestHandler: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         Promise.resolve(requestHandler(req as AuthRequest, res, next)).catch((err) => {
//             if (err instanceof Error) {
//                 return next(createHttpError(500, err.message));
//             }
//             return next(createHttpError(500, "Internal server error --"));
//         });
//     };
// };

export const asyncWrapper = (requestHandler) => {
    const wrapperFunction = async (req, res, next) => {
        try {
            await requestHandler(req, res, next);
        } catch (err) {
            if (err instanceof Error) {
                return next(createHttpError(500, err.message));
            }
            return next(createHttpError(500, "Internal server error!"));
        }
    };

    return wrapperFunction;
};


// export const asyncWrapper = (requestHandler: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>) => {
//     const wrapperFunction = async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const result = validationResult(req);
//             if (!result.isEmpty()) {
//                 return next(createHttpError(400, result.array()[0].msg as string));
//             }

//             const { date, dayName, brackfast, lunch, dinner } = req.body;

//             const prefrenceTotal: PrefrenceTotal = {
//                 date,
//                 dayName,
//                 brackfast,
//                 lunch,
//                 dinner,
//             };

//             const prefrenceTotalCreated = await this.prefrenceTotalService.create(
//                 prefrenceTotal as unknown as PrefrenceTotal,
//             );

//             res.json({ status: "success", id: prefrenceTotalCreated._id });
//         } catch (err) {
//             if (err instanceof Error) {
//                 return next(createHttpError(500, err.message));
//             }
//             return next(createHttpError(500, "Internal server error --"));
//         }
//     };

//     return wrapperFunction;
// };
