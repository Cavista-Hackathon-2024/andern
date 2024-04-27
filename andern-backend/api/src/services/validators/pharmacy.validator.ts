import Joi from "joi"


class PharmacyValidator{
    validateCreatePharmacyPayload(obj: object){
        return Joi.object({
            name: Joi.string().required(),
            licenseId: Joi.string().required().min(9).max(16),
            address: Joi.object({
                state: Joi.string().required(),
                country: Joi.string().required(),
                city: Joi.string().required()
            }).required(),
            coordinate: Joi.object({
                lng: Joi.number().required().min(0),
                lat: Joi.number().required().min(0)
            }).required()
        }).validate(obj)
    }

    validateUpdatePharmacyPayload(obj: object){
        return Joi.object({
            name: Joi.string(),
            address: Joi.object({
                state: Joi.string().required(),
                country: Joi.string().required(),
                city: Joi.string().required()
            }),
            coordinate: Joi.object({
                lng: Joi.number().required().min(0),
                lat: Joi.number().required().min(0)
            })
        }).validate(obj)
    }
}

const pharmacyValidator = Object.freeze(new PharmacyValidator())

export default pharmacyValidator