// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const Restaurant = require('./models/restaurant.js')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })
// mongoose 連線後透過 mongoose.connection 拿到 Connection 的物件
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})


// setting static files
app.use(express.static('public'))

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定 method-override
app.use(methodOverride('_method'))

// 引用 body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// 載入路由器
app.use('/', require('./routes/home.js'))
app.use('/restaurants', require('./routes/restaurant.js'))
app.use('/sort', require('./routes/sort.js'))

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})