const router = require('express').Router();

const pizzaRoutes = require('./pizza-routes');
const commentRoutes = require('./controller-routes');


router.use('/pizzas', pizzaRoutes);
router.use('/comments', commentRoutes);


module.exports = router;