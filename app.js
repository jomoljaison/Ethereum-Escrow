var createError = require('http-errors');
var express = require('express');


var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Web3 = require("web3");

const app = express()


const fs =require('fs');

var multer  = require('multer')
//var upload = multer({ dest: 'uploads/' })

var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})



var fileUpload = require('express-fileupload');

var MyContractJson = require(path.join(__dirname,'build/contracts/Escrow.json'));
if (typeof web3 !== 'undefined') { web3 = new Web3(web3.currentProvider); } 
else
 {

  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); }

buyer="";
seller="";
coinbase = "";

var contractAddress = MyContractJson.networks['4002'].address;
var contractAbi = MyContractJson.abi;
MyContract = new web3.eth.Contract(contractAbi, contractAddress);

console.log("contract address",contractAddress);
console.log(MyContract);
console.log("Buyer",buyer);
console.log("Seller",seller);

var indexRouter = require('./routes/index');
var createPdfRouter = require('./routes/createPdf');
//var getPdfRouter=require('./routes/getPdf');
 var confirmDeliveryRouter=require('./routes/confirmDelivery');
 var confirmPaymentRouter=require('./routes/confirmPayment')

var usersRouter = require('./routes/users');

//var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());

 app.use('/', indexRouter);
 app.use('/createPdf',createPdfRouter);
//app.use('/getPdf',getPdfRouter);
 app.use('/confirmDelivery',confirmDeliveryRouter);
 app.use('/confirmPayment',confirmPaymentRouter);

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.get('/download/:ID',function(req,res){
  console.log(req.params.ID);
  res.redirect('https://ipfs.io/ipfs/'+req.params.ID);
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;