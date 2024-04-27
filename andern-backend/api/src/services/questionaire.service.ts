import { Model } from "mongoose";
import { QuestionaireSchema } from "../models/types/questionaire";
import QuestionaireModel from "../models/questionaire.model";

class QuestionairService{
    constructor(
        private questionaireModel: Model<QuestionaireSchema> = QuestionaireModel
    ){}

    createQuestionaire(obj: object){
        return this.questionaireModel.create({...obj})
    }

    getUserQuestionaire(id: string){
        return this.questionaireModel.findOne({userId: id})
    }

    updateQuestionaire(id: string, updates: object){
        return this.questionaireModel.findOneAndUpdate({userId: id}, updates, {new: true})
    }
}

const questionaireService = new QuestionairService()

export default Object.freeze(questionaireService)