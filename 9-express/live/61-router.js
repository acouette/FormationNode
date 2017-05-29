const express = require('express');

const router = express.Router();

//define first !!
router.use((req, res, next) => {
  console.log('used bird router');
  next();
});

router.get('/', (req, res) => {
  res.send('Birds')
});

router.get('/about', (req, res) => {
  res.send('about')
});


module.exports = router;