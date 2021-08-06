****Project name:	Escrow***



Setting Up:

***Step 1:***	 Download the repostory using the command:  

 Git Clone   https://github.com/jomoljaison/Escrow.git

In order to run this project locally in your computer you need the following packages installed in your System and the commands to install the packages are given below:

***Step 2***	 You need to install Nodejs

	<command> : npm install nodejs
	
	 Download ganache :https://www.trufflesuite.com/ganache

***Step 3***	Install the all dependecies using these commands:

	1. sudo apt-get install npm
	2. npm install
	3. npm install express-generator
	4. npm install web3
	5. npm install truffle


***Step 4 	/***	Open ganache 

	Create new workspace

				1.Workspace name : SamsungContarct

				2.Server : Hostname------  127.0.0.1-lo

			      		   Port Number---- 8545

			            	   Network ID----- 4002
						   
				3.Save workspace

***Step 5***	Change coinbase address in app.js and addresss in migration file

***Step 6***	Change contract environment to Web3 provider

***Step 7***	Use the following command to deploy the smart contract to the connected 	         chain: 

	   <command> : truffle migrate
***Step 8***	Run the dapp using the command  

       <command> :  npm start  


***Step 9:***	Go http://localhost:3000/
	