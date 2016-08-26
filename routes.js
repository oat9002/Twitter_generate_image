"use strict";
import express from 'express'
import bodyParser from 'body-parser'
import twitterRouter from './controller/TwitterController'
import { Twitter } from './model/Twitter'
import cors from 'cors'



const port = process.env.port || 7770
let app = express()


// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(cors())

//parent url
app.route('/').get((req, res) => {
  res.send('<h1>Social REST Api</h1><ul><li>/twitter</li><li>/facebook</li></ul>')
})

app.use('/twitter', twitterRouter)


//service start
app.listen(port, () => {
  console.log('Starting node.js on port ' + port)
});
