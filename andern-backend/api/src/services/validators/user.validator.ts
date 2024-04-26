import Joi from "joi"

class UserValidator{
    validateCreateUserPayload(obj: object){
        return Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            type: Joi.string().required()
        }).validate(obj)
    }
}

const userValidator = new UserValidator()

export default Object.freeze(userValidator)