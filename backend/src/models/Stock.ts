import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
    name: {type:String , required:true},
    purchasePrice: {type: Number , required: true},
    qty: {type: Number , required: true},
    exchangeCode: {type: String , required: true},
    sector : {type: String , required: true},
    exchange: {type: String , default: "NSE"}
}, {timestamps: true});

export default mongoose.model('Stock', stockSchema);