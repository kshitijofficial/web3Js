const {Web3} = require ("web3");
const dotenvenc = require('@chainlink/env-enc')
dotenvenc.config();


const ABI = require("./abi")
const contractAddress = "0xA4f903fe9dDeBD25e87d7feA70f8BC7a7a58403E"

const smartContract = async()=>{
  const provider = process.env.SEPOLIA_RPC_URL
  const web3 = new Web3(provider);

  const privateKey = process.env.PRIVATE_KEY
  const privateKeyHex = '0x'+privateKey;
  const account = web3.eth.accounts.privateKeyToAccount(privateKeyHex);
  const contract = new web3.eth.Contract(ABI,contractAddress)
  const to="0x4653CeA34af4B3cF4B27C912A5BBEE015b9E7Fb0"
  const amount="500000000000000000"
  await contract.methods.transfer(to,amount).send({from:account.address});
  console.log("Transfer successful")
}
smartContract()

// const eventsCheck = ()=>{
//   const provider = process.env.SEPOLIA_RPC_URL
//   //   const privateKey = process.env.PRIVATE_KEY
//   const web3 = new Web3(provider);
  
//   const contract = new web3.eth.Contract(ABI,contractAddress)
//   const eventName = 'Transfer';
//   const options = {
//     fromBlock: 4986055, // The block number to start looking for events (0 is the genesis block)
//     toBlock: 'latest', // The block number to stop looking for events (latest means the latest block)
//     // filter: {
//     //   from:"0xa2c8345b30B4c26e118F307269dE96913DbdB4bC",
//     //   to:"0x4653CeA34af4B3cF4B27C912A5BBEE015b9E7Fb0"
//     // }, // You can add additional filters here
//   };
  
//   // Fetch past events
//   contract.getPastEvents(eventName, options)
//     .then((events) => {
//       console.log(events);
//     })
//     .catch((error) => {
//       console.error(error);
//     });

// }
// eventsCheck()

//https://eth-sepolia.g.alchemy.com/v2/rU8b_gP7cbcOVZWoFPqn38eGGT9fc67H