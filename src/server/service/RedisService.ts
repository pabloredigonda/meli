"use strict"; 
import Redis from 'redis'
import { injectable, inject } from "inversify";
import { RedisServiceInterface } from "../interfaces"
import { TYPES } from "../types";
import 'reflect-metadata';

@injectable()
class RedisService implements RedisServiceInterface{
	
	private readonly client
	
	public constructor(host: string, port: number){
		this.client = Redis.createClient({
			host: host,
			port: port
		});
	}

	public getClient () {
		return this.client
    }
}

export default RedisService