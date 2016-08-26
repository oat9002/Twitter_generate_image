import cron from 'cron'
import axios from 'axios'
import Canvas from 'canvas'
import split from 'icu-wordsplit'
var request = require('request').defaults({ encoding: null });

let cronJob = cron.CronJob

var mockData = {
  "picture": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/v/t1.0-1/p50x50/13307361_1699730896916160_4024021109681787383_n.jpg?oh=6813ae68341be6dc1611c97aa58e104b&oe=583D78A6&__gda__=1482093415_b95fc9c2e5accafd56daf207ab72fd4f",
  "name": "CE KMITL",
  "name2": "@ce_kmitl_52",
  "comment": "Computer Engineering สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง #ทีมลาดกระบัง #KMITL #ลูกพระจอม",
  "created_time": "2016-08-24T12:46:03+0000"
}

// export function getTopFiveHashtagImage() {
//   return new Promise((resolve, reject) => {
//     axios.get('http://localhost:7774/twitter/getTopFiveHashtag')
//       .then(response => {
//         let data = response.data.hashtags
//         let arrHashtag = new Array(data.length)
//         data.forEach((item, index) => {
//           generateImage(index, item, data.length).then(image => {
//             arrHashtag[index] = image
//           })
//         })
//         resolve(arrHashtag)
//       })
//       .catch(error => {
//         reject(error)
//       })
//   })
// }



function generateImage(order, word, size) {
  let Image = Canvas.Image
  let canvas = new Canvas(100, 500)
  let ctx = canvas.getContext('2d');
  let fontSize = 24

  ctx.font = fontSize + 'px Arial';
  ctx.fillText(word, 50, 100);

  var te = ctx.measureText(word);
  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath();
  ctx.stroke();
  return new Promise(resolve => {
    resolve(canvas.toDataURL())
})
}

export function feedTwitter(){
  let data = mockData
  let date = new Date(data.created_time)
  let Image = Canvas.Image
  let canvas = new Canvas(500, 100)
  let ctx = canvas.getContext('2d')

  ctx.fillStyle="#f6f7f9"
  //ctx.fillStyle="#FFFF99"
  ctx.fillRect(0,0,500,100)
  ctx.fillStyle="#FFFF99"
  ctx.fillRect(15,20,45,45)
  ctx.font = 'bold 12px Arial'
  ctx.fillStyle="#365899"
  ctx.fillText(data.name, 75, 30)
  ctx.font = ' 12px Arial'
  ctx.fillStyle="#90949c"
  ctx.fillText(data.name2, 150, 30)
  ctx.font = '12px Arial'
  ctx.fillStyle="#1d2129"
  wrapText(ctx, data.comment,75, 46, 400, 15);
  ctx.font = '12px Arial'
  ctx.fillStyle="#90949c"
  ctx.fillText(data.created_time,75,88)


  // request.get(data.picture, function (error, response, body) {
  //     if (!error && response.statusCode == 200) {
  //         data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
  //
  //         var image = new Image()
  //         image.onload = function() {
  //             ctx.drawImage(image, 15, 30)
  //         }
  //         image.src = data
  //         // console.log(data);
  //         resolve(canvas.toDataURL())
  //
  //     }
  // })

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

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  var words = split('th_TH',text)
  var space = text.split(" ")
  var line = '';
  var spaceIndex =0
  var spaceCount= 0
  var textCount =0
  var out =0

  for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n]
      textCount = testLine.length
          var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if( (spaceCount+space[spaceIndex].length-out ==textCount )&& (testWidth < maxWidth)){
          spaceCount=textCount+1
          textCount = 0
          testLine= testLine+" "
          spaceIndex=spaceIndex+1
          out = 0
      }

      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y)
        line = words[n]

        if(line.length == space[spaceIndex-1].length){
          line= line+" "
          spaceCount=line.length

        }
        else{
          out = textCount-spaceCount-line.length
          spaceCount=0

        }


        if( spaceCount+space[spaceIndex].length-out == line.length){
            spaceCount=line.length+1
            textCount = 0
            line= line+" "
            spaceIndex=spaceIndex+1
            out = 0
        }
        y += lineHeight
      }
      else {
        line = testLine

      }
  }
  context.fillText(line, x, y);
}



  //  ctx.fillStyle="#f6f7f9"
  //  ctx.fillRect(0,0,400,200)
  //  ctx.fillStyle="#3b5998"
  //  ctx.fillRect(15,30,20,20)
