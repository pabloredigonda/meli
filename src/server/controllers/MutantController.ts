import * as express from "express";
import 'reflect-metadata';
import { interfaces, controller, httpPost, request, response } from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../types"
import { DnaServiceInterface } from "../interfaces"
import RedisSMQ from 'rsmq'

@controller("/mutant")
export class MutantController implements interfaces.Controller {

	private readonly service: DnaServiceInterface
	private readonly rsmq: RedisSMQ

	constructor( 
		@inject(TYPES.DnaServiceInterface) service: DnaServiceInterface, 
		@inject(RedisSMQ) rsmq: RedisSMQ 
	){
		this.service = service
		this.rsmq = rsmq
	}

    @httpPost("/")
    private async index(@request() req: express.Request, @response() res: express.Response) {
		try {
			
			const isMutant: boolean= this.service.isMutant(req.body.dna)

			if(!isMutant){
				res.status(403)
			}else{
				res.status(200)
			}

			this.rsmq.sendMessage({
				qname: 'mutant-queue',
				message: JSON.stringify({dna: req.body.dna, isMutant: isMutant}),
			}, (err, resp) => {
			});

			res.send("")

        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}


