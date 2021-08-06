var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    var currentAddress = req.body.buyer;
    console.log(currentAddress)

    var filehash=req.body.filehash;
    console.log(filehash);

    MyContract.methods.confirmDelivery().send({ from: buyer, gas: 1500000,to:seller})
        .on('receipt', function (receipt) {
            console.log(receipt)
            res.redirect('https://ipfs.io/ipfs/'+filehash);
            //res.send("<---------------AMOUNT credited--------------------->")
        })
        .on('error', (error) => {
            console.log(error.message);
            res.send("<---------------ACTION failed!!!!!");
        })
});

module.exports = router;