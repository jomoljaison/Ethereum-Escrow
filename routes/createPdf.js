var express = require('express');
var router = express.Router();

var ipfsAPI = require('ipfs-api');


router.post('/', function (req, res, next) {

    const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

    data = req.body;
   // uid = req.body.id;

   myFileBuffer = req.files.uploadFile.data;
   console.log(myFileBuffer);
   ipfs.files.add(myFileBuffer, function (err, file) {
     if (err) throw err;
 
     let url = `https://ipfs.io/ipfs/${file[0].hash}`;
     console.log(`Url --> ${url}`);

     res.send(`IPFS HASH OF PDF ----- ${url}`);

    console.log(data);
    MyContract.methods.createPdf(data.id,data.name,web3.utils.toWei(data.price,'ether'),file[0].hash) .send({ from: coinbase, gas : 6000000 })
    

    console.log("<====Console Success====>")

    });


   
  
      
});

 

module.exports = router;

