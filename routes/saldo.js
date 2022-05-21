const express = require('express')
const router = express.Router()

router.get('/', async function (req, res, next) {
    res.send('ok')
})
module.exports = router