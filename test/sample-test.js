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

    expect(await privacy.locked()).to.equal(true);
    const bytes_storage = await getStorage(privacy, [0,1,2,3,4,5]);
  
  });
});
