'use strict'
import 'reflect-metadata';
import { container } from "./inversify.config"
import { TYPES } from "./types";
import RSMQWorker from 'rsmq-worker'
import { RepositoryInterface } from "./interfaces";

const repository = container.get<RepositoryInterface>(TYPES.RepositoryInterface)
const worker = container.get<RSMQWorker>(RSMQWorker)

console.log("WORKER start");

worker.on( "message", function( msg, next, id ){
	const message = JSON.parse(msg)

	// console.log('new message received:')

	repository.addDna(message.dna, message.isMutant, (doc)=>{
		// console.log('new dna inserted:')
		// console.log(doc)
	})
	next()
});

// optional error listeners
worker.on('error', function( err, msg ){
	console.log( "ERROR", err, msg.id );
});
worker.on('exceeded', function( msg ){
	console.log( "EXCEEDED", msg.id );
});
worker.on('timeout', function( msg ){
	console.log( "TIMEOUT", msg.id, msg.rc );
});

worker.start();

