import joi from "joi";

let regex =
    /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{6,33}$/;

export const createAccount = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    contact: joi.string().required(),
    address: joi.string().required(),
    password: joi.string().pattern(new RegExp(regex)).required(),
    confirm: joi.ref("password"),
});

export const signInAccount = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp(regex)).required(),
});
