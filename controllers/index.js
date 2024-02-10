// Defines routes for both main application functionality and API endpoints, routing requests to appropriate route handlers.
const router = require('express').Router();
const apiRoutes = require('./api');
const mainRoutes = require('./main-routes');

router.use('/', mainRoutes);
router.use('/api', apiRoutes);

module.exports = router;