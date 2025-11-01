
import mongoose , {Schema , Model} from "mongoose";
import {IStock} from "../types/portfolio_types.js"
const stockSchema = new Schema<IStock>(
    {
    name: {type:String , required:true},
    purchasePrice: {type: Number , required: true},
    qty: {type: Number , required: true},
    exchangeCode: {type: String , required: true},
    sector : {type: String , required: true},
    exchange: {type: String , default: "NSE"}
}, 
{timestamps: true}
);

export const Stock : Model<IStock> = mongoose.model('Stock', stockSchema);