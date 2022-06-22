const MyERC20Token = artifacts.require("MyERC20Token");

let token;

contract("MyERC20Token", (accounts) => {
  beforeEach(async () => {
    token = await MyERC20Token.new();
  });

  it("creation: should create an initial balance of 10000 for the creator", async () => {
    const balance = await token.balanceOf.call(accounts[0]);
    assert.strictEqual(balance.toNumber(), 10000);
  });
});
