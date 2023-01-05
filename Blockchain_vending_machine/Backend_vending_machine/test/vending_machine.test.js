
const vendingMachine=artifacts.require("vendingMachine");
contract("vendingMachine",(accounts)=>{
    console.log("line 4");
    before(async()=>{
        console.log("line");
        instance=await vendingMachine.deployed()
        console.log("line8");
    })
    console.log("line 10");
    it('ensures that the starting balance of the vending machine is 100',async()=>{
        let balance=await instance.getVendingMachineBalacnce()
        assert.equal(balance,100,'the inistial balance shoud be 100 donuts')
    })
})
// const vendingMachine = artifacts.require("vendingMachine");
// contract("vendingMachine",(accounts)=>{
//     before(async ()=>{
//         instance  = await vendingMachine.deployed();
//     })
//     it("ensures that the starting balance of the vending machine is 100",async ()=>{
//         let balance = await instance.getVendingMachineBalacnce();
//         assert.equal(balance,100,"The initial balance should be 100 donuts.");
//     })
    // it("ensures the balance of the vending machine can be updated",async ()=>{
    //     await instance.restock(100);
    //     let balance = await instance.getVendingMachine();
    //     assert.equal(balance,200,"The initial balance should be 200 donuts.");
    // })
    // it("allows donuts to be purchased",async ()=>{
    //     await instance.purchase(1,{from:accounts[0],value:web3.utils.toWei('3','ether')});
    //     let balance = await instance.getVendingMachine();
    //     assert.equal(balance,199,"The initial balance should be 199 donuts.");
    // })
// })