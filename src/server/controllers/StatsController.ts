import * as express from "express";
import 'reflect-metadata';
import { interfaces, controller, httpGet, request, response } from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../types"
import { CacheServiceInterface, RepositoryInterface } from "../interfaces"

@controller("/stats")
export class StatsController implements interfaces.Controller {

	private readonly cache: CacheServiceInterface;
	private readonly repository: RepositoryInterface;

	constructor (
		@inject(TYPES.CacheServiceInterface) cache: CacheServiceInterface, 
		@inject(TYPES.RepositoryInterface) repository: RepositoryInterface
	){
        this.cache = cache
		this.repository = repository
    }

    @httpGet("/")
    private async index(@request() req: express.Request, @response() res: express.Response) {
		try{
		
			console.log("get from cache")
		
			let data = await this.cache.getStats()

			console.log("cache")
			console.log(data)

			if(!data){
			
				console.log("get from db")
			
				data = await this.repository.getStats()
				
				console.log("Set in  cache")	
				
				this.cache.setStats(data)
			}

			console.log("result")

			res.json(data)
		} catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

}
