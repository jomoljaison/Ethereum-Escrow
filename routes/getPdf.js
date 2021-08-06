var express = require('express');
var router = express.Router();
var ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})


router.get('/', function (req, res, next) {
    data = req.query;
    console.log(data);

    _url=req.body._url;
    console.log(_url);

    MyContract.methods.getPdf(data.id)
        .call({ from: coinbase }).then((txn) => {
            console.log("<=====HASH OF IPFS=====>",txn);

            res.render("event", {mydata :_url});
        })
});

module.exports = router;
