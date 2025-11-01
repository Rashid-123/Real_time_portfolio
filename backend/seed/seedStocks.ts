import mongoose from "mongoose";
import dotenv from 'dotenv';
import {Stock} from '../src/models/Stock.js';
import stockData from '../data/stocks.json' assert {type: 'json'};

dotenv.config();

const seedStocks = async () => {
    try {
        
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("Connected to MongoDB");
          
        // Clear all previous stocks data 
        await Stock.deleteMany({});
        console.log("Cleared the existing stocks");

        await Stock.insertMany(stockData);
        console.log(`Seeded ${stockData.length} stocks`);

        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");

        process.exit(0);
    } catch (error) {

        console.log("seed Error" , error);
        process.exit(1);
        
    }

}

seedStocks();