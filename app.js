// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')                    // 載入 mongoose
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })

// mongoose 連線後透過 mongoose.connection 拿到 Connection 的物件
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 載入 Restaurant model
const Restaurant = require('./models/restaurant')

// 引用 body-parser
const bodyParser = require('body-parser');

// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }));


// require express-handlebars here
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


// setting static files
app.use(express.static('public'))


// 設定路由
// 首頁
app.get('/', (req, res) => {
  //res.render('index', { restaurants: restaurantList.results })

  Restaurant.find((err, restaurants) => {                                 // 把 Restaurant model 所有的資料都抓回來
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants })  // 將資料傳給 index 樣板
  })

})

// 列出全部
app.get('/restaurants', (req, res) => {
  res.send('列出所有restaruant')
})

// 新增一筆 Restaurant 頁面
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

// 顯示一筆 Restaurant 的詳細內容
app.get('/restaurants/:id', (req, res) => {
  res.send('顯示 Restaurant 的詳細內容')
})

// 新增一筆 Restaurant
app.post('/reataurants', (req, res) => {
  const restaurant = new Restaruant({
    id: req.body.id,
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
    // 是從 new 頁面 form 傳過來
  })

  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')                        // 新增完成後，將使用者導回首頁
  })
})


// 修改 Restaurant 頁面
app.get('/restaurants/:id/edit', (req, res) => {
  res.send('修改Restaurant 頁面')
})

// 修改 Restaurant
app.post('/restaurants/:id', (req, res) => {
  res.send('修改Restaurant')
})

// 刪除 Restaurant
app.post('/restaurants/:id/delete', (req, res) => {
  res.send('刪除Restaurant')
})


app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
      || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})