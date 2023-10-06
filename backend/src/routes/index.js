const express = require('express');
const router = express.Router();
const userRoute = require('./user.route');
const examRoute = require('./examPaper');
const defaultRoutes = [
  {
    path:'/user',
    route:userRoute
  },
  {
    path:'/exampaper',
    route:examRoute
  }
]

defaultRoutes.forEach((route)=>{
  router.use(route.path, route.route);
})
module.exports = router;