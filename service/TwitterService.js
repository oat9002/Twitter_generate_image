import cron from 'cron'
import axios from 'axios'
import Canvas from 'canvas'

let cronJob = cron.CronJob

export function getTopFiveHashtagImage() {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:7774/twitter/getTopFiveHashtag')
      .then(response => {
        let data = response.data.hashtags
        let arrHashtag = new Array(data.length)
        data.forEach((item, index) => {
          generateImage(index, item, data.length).then(image => {
            arrHashtag[index] = image
          })
        })
        resolve(arrHashtag)
      })
      .catch(error => {
        reject(error)
      })
  })
}

function generateImage(order, word, size) {
  let Image = Canvas.Image
  let canvas = new Canvas(200, 200)
  let ctx = canvas.getContext('2d');
  let fontSize = 24

  ctx.font = fontSize + 'px Arial';
  ctx.fillText(word, 50, 100);

  // var te = ctx.measureText(word);
  // ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  // ctx.beginPath();
  // ctx.stroke();
  return new Promise(resolve => {
    resolve(canvas.toDataURL())
})
}

export function testCanvas() {
    let Image = Canvas.Image
    let canvas = new Canvas(400, 200)
    let ctx = canvas.getContext('2d');

    ctx.font = '30px Arial';
    ctx.fillText("Awesome! .สุดยอด", 50, 100);

    var te = ctx.measureText('Awesome! สุดยอด');
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.lineTo(50, 102);
    ctx.lineTo(50 + te.width, 102);
    ctx.stroke();
    return new Promise(resolve => {
      resolve(canvas.toDataURL())
  })
}
