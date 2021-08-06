// SPDX-License-Identifier: GPL-3.0 
pragma solidity >=0.4.16 <0.9.0;
// Defining a Contract
contract Escrow{

	// Declaring the state variables

	address payable public buyer;
	address payable public seller;
	uint public price;
	address payable public arbiter;
	 uint public PdfCount = 0;

// 	mapping(address => uint) TotalAmount;

   struct Pdf {
        uint id;
        string name;
        uint price;
        	address payable  buyer;

        address payable seller;
    }
    mapping(uint=>Pdf)public pdfs;
    mapping(uint => string) ipfsUrl;


	// Defining a enumerator 'State'
	enum State{
		
		// Following are the data members
		awate_payment, awate_delivery, complete
	}

	// Declaring the object of the enumerator
	State public state;
	
	// Defining function modifier 'instate'
	modifier instate(State expected_state){
		
		require(state == expected_state);
		_;
	}

// Defining function modifier 'onlyBuyer'
	modifier onlyBuyer(){
		require(msg.sender == buyer ||
				msg.sender == arbiter);
		_;
	}

	// Defining function modifier 'onlySeller'
	modifier onlySeller(){
		require(msg.sender == seller);
		_;
	}
	
	event gets(string name);
    event confirmpayment(address buyer);

	// Defining a constructor
	constructor(address payable _buyer,
				address payable _sender) public{
		
		// Assigning the values of the
		// state variables
		arbiter = msg.sender;
		buyer = _buyer;
		seller = _sender;
		state = State.awate_payment;
	}
	   

    	   
	    function createPdf(uint _id,string memory _name, uint _price,string memory _url) public onlySeller
	{
     
        pdfs[_id].id = _id;
         pdfs[_id].name = _name;
         pdfs[_id].price = _price;
        ipfsUrl[_id]=_url;

         pdfs[_id].seller = msg.sender;
         
         emit gets(_name);
    }


  

	     function getPdf(uint _id) public view returns (string memory _url)
	{
		return(ipfsUrl[_id]);
       
    }
    
    
    
	// Defining function to confirm payment
	function confirmPayment() onlyBuyer external payable{

		state = State.awate_delivery;
		emit confirmpayment( buyer);

	}  
	
	
	// Defining function to confirm delivery
	function confirmDelivery() onlyBuyer external{

		seller.transfer(address(this).balance);
		state = State.complete;
		
	}
	
	

	// Defining function to return payment
	function ReturnPayment() onlySeller instate(
	State.awate_delivery)public{
		
		
	buyer.transfer(address(this).balance);
	}
	
}
