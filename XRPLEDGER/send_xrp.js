// In browsers, use a <script> tag. In Node.js, uncomment the following line:
// const xrpl = require('xrpl')

// Wrap code in an async function so we can use await
const xrpl = require("xrpl")

async function main() {

    // Define the network client
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    await client.connect()

    // ... custom code goes here
    // Example credential
    // Example credentials
   
    const wallet = xrpl.Wallet.fromSeed("sEdSPw6xXpgj6vuyU5wrGVZtjgEnXn5")
    console.log(wallet.address) // 

    // Prepare transaction -------------------------------------------------------
    const prepared = await client.autofill({
        "TransactionType": "Payment",
        "Account": wallet.address,
        "Amount": xrpl.xrpToDrops("1"),
        "Destination": "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe"
    })
    const max_ledger = prepared.LastLedgerSequence
    console.log("Prepared transaction instructions:", prepared)
    console.log("Transaction cost:", xrpl.dropsToXrp(prepared.Fee), "XRP")
    console.log("Transaction expires after ledger:", max_ledger)

    // Sign prepared instructions ------------------------------------------------
    const signed = wallet.sign(prepared)
    console.log("Identifying hash:", signed.hash)
    console.log("Signed blob:", signed.tx_blob)

    // Submit signed blob --------------------------------------------------------
    const tx = await client.submitAndWait(signed.tx_blob)
    console.log(tx);
    // Check transaction results -------------------------------------------------
    console.log("Transaction result:", tx.result.meta.TransactionResult)
    console.log("Balance changes:", JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))

    // Disconnect when done (If you omit this, Node.js won't end the process)
    client.disconnect()
}

main()