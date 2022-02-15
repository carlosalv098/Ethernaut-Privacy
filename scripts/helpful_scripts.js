const {ethers} = require('hardhat')

async function deploy(name, ...args) {   
    const Contract = await hre.ethers.getContractFactory(name);
    let contract;
    if(args){
        contract = await Contract.deploy(...args);
    } else {
        contract = await Contract.deploy();
    }

    await contract.deployed();
    console.log(`${name} deployed wtih address: ${contract.address}`);
    return[Contract, contract]
}

async function getStorage(contract, slots) {
    console.log('------------------ Slot Storage Bytes ------------------');
    let storage = [];
    for(let i = 0; i < slots.length; i++){
        let storage_bytes = await ethers.provider.getStorageAt(contract.address, slots[i])
        console.log(`\tSlot[${i}] = ${storage_bytes}`);
        storage.push(storage_bytes)
    }
    console.log('------------------ End Slot Storage Bytes------------------');
    return storage;
}


module.exports = {
    deploy,
    getStorage
}