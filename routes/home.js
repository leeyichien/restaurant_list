// routes/home.js
const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

// 首頁
router.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants })
  })
})

//Search
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    const restaurantSearch = restaurants.filter(({ name, category }) => {
      return (category.toLowerCase().includes(keyword.toLowerCase()) || name.toLowerCase().includes(keyword.toLowerCase()))
    })
    return res.render('index', { restaurants: restaurantSearch, keyword: keyword })
  })
})


//Sort
router.get('/sort', (req, res) => {
  const sortkeyword = req.query.sort
  console.log(sortkeyword)
  if (sortkeyword = "1") {
    Restaurant.find({})
      .sort({ name: 'asc' })
      .exec((err, restaurants) => {
        if (err) return console.error(err)
        return res.render('index', { restaurants: restaurants })
      })
  }
  if (sortkeyword = "2") {
    Restaurant.find({})
      .sort({ name: 'dasc' })
      .exec((err, restaurants) => {
        if (err) return console.error(err)
        return res.render('index', { restaurants: restaurants })
      })
  }
  if (sortkeyword = "3") {
    Restaurant.find({})
      .sort({ category: 'asc' })
      .exec((err, restaurants) => {
        if (err) return console.error(err)
        return res.render('index', { restaurants: restaurants })
      })
  }
  if (sortkeyword = "4") {
    Restaurant.find({})
      .sort({ location: 'asc' })
      .exec((err, restaurants) => {
        if (err) return console.error(err)
        return res.render('index', { restaurants: restaurants })
      })
  }

})

module.exports = router