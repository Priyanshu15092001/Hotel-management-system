const {addMenuItem,getMenuItem} = require('../controllers/menuController')
const express = require('express')

const router = express.Router()

router.post('/',addMenuItem)
router.get('/',getMenuItem)

module.exports=router