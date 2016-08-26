"use strict";
import express from 'express'
import * as TwitterService from '../service/TwitterService'
import {db} from '../db'

let twitterRouter = express.Router()

twitterRouter.route('/').get((req, res) => {
  res.send('<h1>Hello Twitter generate image service</h1>')
})

twitterRouter.route('/testCanvas').get((req, res) => {
  TwitterService.testCanvas().then(canvas => {
    res.send('<img src="' + canvas + '" />')
  })
})

twitterRouter.route('/feedTwitter').get((req, res) => {
  TwitterService.feedTwitter().then(canvas => {
    res.send('<img src="' + canvas + '" />')
  })
})



twitterRouter.route('/getTopFiveHashtagImage').get((req, res) => {
  TwitterService.getTopFiveHashtagImage().then(canvas => {
    let arrImage = new Array(canvas.length)
    canvas.forEach((item, index) => {
      arrImage[index] = item
    })
    res.send({images : arrImage})
  })
})

twitterRouter.route('/testTopFiveHashtagImage').get((req, res) => {
  TwitterService.getTopFiveHashtagImage().then(canvas => {
    let str = ''
    canvas.forEach(item => {
      str = str + '<img src="' + item + '" />' + '<br/><br/>'
    })
    res.send(str)
  })
})

export default twitterRouter
