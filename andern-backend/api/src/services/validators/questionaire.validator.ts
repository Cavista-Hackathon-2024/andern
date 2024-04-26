import Joi from "joi";


class QuestionaireValidator{


    validateCreateQuestionairePayload(obj: object){
        return Joi.object({
            bmi: Joi.string().required(),
            dob: Joi.string().required(),
            genotype: Joi.string().required(),
            bloodGroup: Joi.string().required(),
            gender: Joi.string().required(),
        }).validate(obj)
    }

    
    validateUpdateQuestionPayload(obj: object){
        return Joi.object({
            bmi: Joi.string(),
            dob: Joi.string(),
            genotype: Joi.string(),
            bloodGroup: Joi.string(),
            gender: Joi.string(),
        }).validate(obj)
    }
}


const questionaireValidator = new QuestionaireValidator()

export default Object.freeze(questionaireValidator)