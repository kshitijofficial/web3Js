const { Web3 } = require("web3");
const dotenvenc = require('@chainlink/env-enc');
dotenvenc.config();

const ABI = require("./abi");
const contractAddress = "0xA4f903fe9dDeBD25e87d7feA70f8BC7a7a58403E";

const smartContract = async () => {
  try {
    const provider = process.env.SEPOLIA_RPC_URL;
    const web3 = new Web3(provider);

    const privateKeyString = process.env.PRIVATE_KEY;
    const privateKeyHex = '0x' + privateKeyString;

    // Validate the length of the private key
    if (privateKeyHex.length !== 66) {
      throw new Error('Invalid private key length');
    }
    const contract = new web3.eth.Contract(ABI, contractAddress);
    const account = web3.eth.accounts.wallet.add(privateKeyHex).get(0);
    
    const to = "0x4653CeA34af4B3cF4B27C912A5BBEE015b9E7Fb0";
    const amount = "500000000000000000";

    const transaction = {
      from: account?.address,
      to: contractAddress,
      data: contract.methods.transfer(to, amount).encodeABI(),
      gas: '300000', // Use the estimated gas
    };

    const signedTransaction = await web3.eth.sendTransaction(transaction);
    console.log(signedTransaction)
  } catch (error) {
    console.error("Error:", error.message);
  }
};

smartContract();

//0xc189dCb1b9b5da692A655a99b596aD351A18c5f9