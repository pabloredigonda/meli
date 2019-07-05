"use strict"; 
import { CacheServiceInterface, RedisServiceInterface } from "../interfaces"
import { TYPES } from "../types"
import RedisService from "../service/RedisService"
import { injectable, inject } from "inversify";
import 'reflect-metadata';

@injectable()
class CacheService implements CacheServiceInterface{

	private service: RedisServiceInterface
	private key: string = 'dna:stats'

	public constructor (
        @inject(TYPES.RedisServiceInterface) service: RedisServiceInterface
    ) {
        this.service = service;
    }

	public getStats () {
		return new Promise((resolve, reject) => {
			this.service.getClient().get(this.key, (err, data) => {
				if (err) {	
					reject(err)
				}	

				if(data !=null){
					data = JSON.parse(data)
				}

				resolve(data)
			})
		})
	}

	public setStats (data: JSON) {
		this.service.getClient().set(this.key, JSON.stringify(data), 'EX', 120)
    }
}

export default CacheService