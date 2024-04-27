import mongoose from "mongoose";
import { PharmacySchema } from "./types/pharmacy";
import userModel from "./user.model";

const pharmacySchema = new mongoose.Schema<PharmacySchema>({
    name: { type: String, required: true },
    address: {
        required: true,
        type: {
            country: { type: String, required: true},
            state: {type: String, required: true},
            city: {type: String, required: true}
        }
    },
    coordinate: {
        type: {
            lng: {type: Number, required: true},
            lat: {type: Number, required: true}
        }
    },
    licenseId: {type: String, required: true, minlength: 9, maxlength:16},
    licenseVerified: {type: Boolean, default: false},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "user"}
}, {timestamps: true})

export default mongoose.model('pharmacy', pharmacySchema)