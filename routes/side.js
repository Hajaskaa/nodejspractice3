const express = require('express');
const router = express.Router();


router.use((req,res,next)=>{
    console.log(req.method);
    next();
})


module.exports = router;