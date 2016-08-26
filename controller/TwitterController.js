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

twitterRouter.route('/getTweetImage').get((req, res) => {
  let arrImage = []
  TwitterService.getTweetImage().then(canvas => {
    canvas.forEach(item => {
      arrImage.push(item)
    })
    res.send({images: arrImage})
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

twitterRouter.route('/testTweetImage').get((req, res) => {
  TwitterService.getTweetImage().then(canvas => {
    let str = ''
    canvas.forEach(item => {
      str = str + '<img src="' + item + '" />' + '<br/><br/>'
    })
    res.send(str)
  })
})

twitterRouter.route('/testTweetImageData').get((req, res) => {
  TwitterService.testImageData().then(data => {
    let str = str + '<img src="' + data + '" />'
    res.send(str)
  })
})
export default twitterRouter
