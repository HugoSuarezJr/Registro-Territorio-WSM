const express = require("express")
const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({
        message: 'No Tocar'
    })
});
router.get('/Profile', (req, res, next) => {
    res.json({
        message: 'Helloooooo'
    })
});

module.exports = router;
