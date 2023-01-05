const { ethers } = require("ethers");
// const randomwallet = ethers.Wallet.createRandom()
// account 3 Private key
let privateKey = '1853bf4a82934e8cc121f1664030114edf751a3c0eb367449773b293aa20a241'

const network = 'ropsten'
let provider = ethers.getDefaultProvider(network);
let wallet = new ethers.Wallet(privateKey, provider);

let transaction = {
    nonce:47,
    gasLimit: 21000,
    gasPrice: ethers.utils.parseUnits("0.000000005"),
    to: "0x36458BD5Fa20389fa2A215A51555f962923e5125",
    value: ethers.utils.parseEther("1.0"),
    // chainId:provider.utils.getNetwork(network).chainId
}
console.log(wallet.address);
// let signPromise = wallet.signTransaction(transaction, privateKey)
// console.log(signPromise);
// signPromise.then((signedTransaction) => {
//     provider.sendTransaction(signedTransaction).then((tx) => {
//         console.log(tx);
//     })
//     console.log(signedTransaction);
// })
// const sendTransaction=async()=>{
//     const trans=await wallet.sendTransaction(transaction)
//     console.log(trans);
//     const receipt=await trans.wait()
//     console.log(receipt);
// }
// sendTransaction()
// let sendPromise = wallet.sendTransaction(transaction);
// sendPromise.then(async(tx) => {
//     console.log(tx);
//     const ss=tx.wait()
//     console.log("line 30",ss);
   
// })

