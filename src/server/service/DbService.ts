"use strict"; 
import mongoose from 'mongoose'
import { injectable, inject } from "inversify";
import { DbServiceInterface } from "../interfaces"
import { TYPES } from "../types";
import 'reflect-metadata';

@injectable()
class DbService implements DbServiceInterface{

	private readonly db

	public constructor(host: string, db: string){
		mongoose.connect('mongodb://'+host+'/' + db, {	
			useMongoClient: true
		})

		this.db = mongoose.connection;
		this.db.on('error', console.error.bind(console, 'connection error:'));
	}

	public getDb () {
		return this.db
    }
}

export default DbService