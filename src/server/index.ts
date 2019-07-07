'use strict'
// import dotenv from 'dotenv'
// const result = dotenv.config({ path: '/usr/src/service/dist/.env' })
 
// if (result.error) {
//   throw result.error
// }

import 'reflect-metadata';
import * as bodyParser from 'body-parser'
import { InversifyExpressServer } from 'inversify-express-utils'
import { container } from "./inversify.config"

// declare metadata by @controller annotation
import "./controllers/MutantController"
import "./controllers/StatsController"

// create server
let server = new InversifyExpressServer(container)
server.setConfig((app) => {
  // add body parser
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())
})

let app = server.build()
console.log("Server running on port: " + process.env.PORT)
app.listen(process.env.PORT)


