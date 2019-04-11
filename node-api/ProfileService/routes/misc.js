const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) =>
{
    res.status(200).json({
        message: 'Handling get request from order' 
    });
});

router.post('/', (req,res,next) =>
{
    res.status(201).json({
        message: 'Handling post request from orders' 
    });
});

router.get('/:order_id',(req,res,next) =>{
    res.status(200).json({
        message: 'order_id found',
        id: req.params.order_id
    });
});


router.delete('/:order_id',(req,res,next) =>{
    res.status(200).json({
        message:'order deleted',
        id: req.params.order_id
    });
});

module.exports = router;