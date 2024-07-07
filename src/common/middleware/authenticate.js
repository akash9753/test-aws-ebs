import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

// const authenticate = (req, res, next) => {
//      console.log(req.cookies);
//   try {
//     const cookieNames = Object.keys(req.cookies);
//     let token;

//     for (const cookieName of cookieNames) {
//       if (cookieName.startsWith("accessToken_")) {
//         token = req.cookies[cookieName];
//         break;
//       }
//     }

//     if (!token) {
//       throw new createHttpError.Unauthorized("Missing token");
//     }

//     const decoded = jwt.verify(token, process.env.SECRET_KEY);

//     // Attach the decoded token data to the request object
//     req.auth = {
//       userId: decoded.userId,
//       role: decoded.role,
//     };

//     next();
//   } catch (error) {
//     // Pass the error to the next middleware
//     next(error);
//   }
// };

const authenticate = (req, res, next) => {
  console.log(req.headers);
  try {
    const authHeader = req.headers.authorization;
     console.log(`authHeader`,authHeader);
    // Bearer eyjllsdjfljlasdjfljlsadjfljlsdf
    if (authHeader && authHeader.split(" ")[1] !== "undefined") {
      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      // Attach the decoded token data to the request object
      req.auth = {
        userId: decoded.userId,
        role: decoded.role,
      };

      next();
    }else{
      return next(new createHttpError.Unauthorized("missing token --"));
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new createHttpError.Unauthorized("Invalid token"));
    }
    next(error);
  }
};

export default authenticate;
