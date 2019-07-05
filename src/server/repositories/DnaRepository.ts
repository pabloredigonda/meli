"use strict"; 
import DnaModel from '../models/DnaModel'
import { injectable, inject } from "inversify";
import 'reflect-metadata';

@injectable()
class DnaRepository {

	private readonly model
	private readonly query =  [
		{ $project: {
			_id: 0,
			total: { $sum: 1 },
			mutants: {$cond: [{$eq: ['$isMutant', true]}, 1, 0]}
		}},
		{ $group: {
			_id: 1,
			mutants: {$sum: '$mutants'},
			total: { $sum: 1 }
		}}
	]

	constructor( 
		@inject(DnaModel) model 
	){
		this.model = model
		this.format = this.format.bind(this)
	}

    public addDna(dna: string, isMutant: boolean, callback) {
		let doc = new this.model({dna: dna, isMutant: isMutant})
		doc.save()
	    callback(null, doc)
	}
	
	public getStats(){
		return new Promise((resolve, reject) => {
			this.model.aggregate(this.query, (err, result) => {
				if (err) {
					reject(err)
				}
				resolve(this.format(result))
			})
		})
	}

	private format (result){
		return {
			count_mutant_dna: result[0].mutants,
			count_human_dna: result[0].total - result[0].mutants,
			ratio: result[0].mutants / (result[0].total - result[0].mutants)
		}
	}

}

export default DnaRepository

/*

db.dnas.aggregate(
    { $project: {
        _id: 0,
        total: { $sum: 1 },
        mutants: {$cond: [{$eq: ['$isMutant', true]}, 1, 0]}
    }},
    { $group: {
        _id: 1,
		mutants: {$sum: '$mutants'},
		total: { $sum: 1 }
	}}
);

*/






















