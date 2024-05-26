import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

const authenticate = (req, res, next) => {
    // console.log(req);
  try {
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies.accessToken;

    if (!token) {
      throw new createHttpError.Unauthorized("Missing token");
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Attach the decoded token data to the request object
    req.auth = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};

export default authenticate;
