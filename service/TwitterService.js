import cron from 'cron'
import axios from 'axios'
import Canvas from 'canvas'

let cronJob = cron.CronJob

export function getFiveTopHashtagImage() {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:7774/twitter/getTopFiveHashtag')
      .then(response => {
        let data = response.data
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
  let canvas = new Canvas(400, 200)
  let ctx = canvas.getContext('2d');
  let fontSize = 10 * (size - order)

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
    ctx.fillText("Awesome! สุดยอด", 50, 100);

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

//save tweets every 30 minutes
// let saveTweetJob = new cronJob('* */30 * * * *', () => {
//   getAllQuery().then(docs => {
//     docs.forEach(item => {
//       T.get('search/tweets', { q: item.query}, (err, data) => {
//         if(err) {
//           console.log(err.stack)
//         }
//         else {
//           saveTweet(data)
//         }
//       })
//     })
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// },
// () => {
//   console.log('saveTweetJob has stopped')
// },
// true
// )
