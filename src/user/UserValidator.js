import { body } from "express-validator";

export default [
    body("firstName")
        .exists()
        .withMessage("First name is required")
        .isString()
        .withMessage("First name should be a string"),

    body("lastName")
        .exists()
        .withMessage("Last name is required")
        .isString()
        .withMessage("Last name should be a string"),

    body("email")
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),

    body("mobile")
        .optional()
        .isMobilePhone()
        .withMessage("Invalid mobile phone number"),

    body("password")
        .exists()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),

    body("confirmPassword")
        .exists()
        .withMessage("Confirm password is required")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),

    body("profileImage").custom((value, { req }) => {
        const image = req.files?.profileImage;
        if (image && !image.mimetype.startsWith("image")) {
            throw new Error("Profile image must be an image file");
        }
        return true;
    }),

    body("address")
        .optional()
        .isString()
        .withMessage("Address should be a string"),

    body("city").optional().isString().withMessage("City should be a string"),

    body("country")
        .optional()
        .isString()
        .withMessage("Country should be a string"),
];
