import { Model } from "mongoose";
import PharmacyModel from "../models/pharmacy.model"
import { PharmacySchema } from "../models/types/pharmacy";

class PharmacyService{
    constructor(
        private pharmacyModel: Model<PharmacySchema> = PharmacyModel
    ){}

    create(obj: object){
        return this.pharmacyModel.create({...obj})
    }

    getAll(){
        return this.pharmacyModel.find({})
    }

    getById(id: string){
        return this.pharmacyModel.findById(id)
    }

    getByUserId(id: string){
        return this.pharmacyModel.find({userId: id})
    }

    update(id: string, updates: object){
        return this.pharmacyModel.findByIdAndUpdate(id, {...updates}, {new: true})
    }
}

const pharmacyService = new PharmacyService()

export default Object.freeze(pharmacyService)