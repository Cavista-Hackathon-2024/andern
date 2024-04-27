import mongoose from "mongoose"
import { QuestionaireSchema } from "./types/questionaire"
import { BMI, BloodGroup, Gender, Genotype } from "../utils/enums"

const questionaireSchema = new mongoose.Schema<QuestionaireSchema>({
    bmi: { type: String, required: true, enum: Object.values(BMI)},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    genotype: {type: String, required: true, enum: Object.values(BloodGroup)},
    bloodGroup: {type: String, required: true, enum: Object.values(Genotype)},
    gender: {type: String, required: true, enum: Object.values(Gender) },
})

export default mongoose.model("questionaire", questionaireSchema)