const express = require('express')
const app = express()
const port = 8080

var arr = [];

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 
  next();
})

app.use(express.json());

app.post('/addtofavlist', (req, res) => {

  var book = req.body;

  let flag = 0;

  for(let i=0; i<arr.length; i++) {
    if(book.workid===arr[i].workid) {
      flag = 1;
    }
  }

  if(flag == 0) {
    arr.push(book)
  }

  res.send(res.ok)
})

app.get('/displaytofavlist', (req, res) => {
  res.send(JSON.stringify(arr));
})

app.post('/deletefromfavlist', (req, res) => {

  var book = req.body;

  for(let i=0; i<arr.length; i++) {
    if(book.workid===arr[i].workid) {
      const index = arr.indexOf(arr[i]);
      arr.splice(index, 1);
    }
  }

  res.send(res.ok)
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})