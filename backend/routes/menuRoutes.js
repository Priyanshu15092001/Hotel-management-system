const {addMenuItem,getMenuItem,getMenuById} = require('../controllers/menuController')
const express = require('express')

const router = express.Router()

router.post('/',addMenuItem)
router.get('/',getMenuItem)
router.get('/:id',getMenuById)

module.exports=router