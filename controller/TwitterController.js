"use strict";
import express from 'express'
import * as TwitterService from '../service/TwitterService'

let twitterRouter = express.Router()

twitterRouter.route('/').get((req, res) => {
  res.send('<h1>Hello Twitter generate image service</h1>')
})

twitterRouter.route('/testCanvas').get((req, res) => {
  TwitterService.testCanvas().then(canvas => {
    res.send(canvas)
  })
})

twitterRouter.route('/getFiveTopHastagImage').get((req, res) => {
  TwitterService.getFiveTopHastagImage().then(canvas => {
    let str = ""
    canvas.forEach(item => {
      str = str + '<img src="' + item + '" />' + '<br/><br/>'
    })
    res.send(str)
  })
})

export default twitterRouter
