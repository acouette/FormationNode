const express = require('express');

const router = new express.Router();

router.use('/', [function(req, res, next) {
  console.log('1 bird middleware called');
  next('route');
}, function(req, res, next){
  console.log('2 bird middleware called coucou')
  next();
}]);


router.get('/', (req, res, next) => {
  res.end('cui cui');
});


router.get('/', (req, res, next) => {
  res.end('kwo kwo');
});



module.exports = router;