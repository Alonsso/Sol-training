const {
  BN,
  constants,
  expectEvent,
  expectRevert,
} = require("@openzeppelin/test-helpers");

const MyERC20Token = artifacts.require("MyERC20Token");

contract("MyERC20Token", ([sender, receiver]) => {
  beforeEach(async () => {
    this.value = new BN(1);
    this.erc20 = await MyERC20Token.new();
  });

  it("reverse when transferring tokens to the zero address", async () => {
    await expectRevert(
      this.erc20.transfer(constants.ZERO_ADDRESS, this.value, { from: sender }),
      "ERC20: transfer to the zero address"
    );
  });

  it('emits a Transfer event on successful transfers', async function () {
    const receipt = await this.erc20.transfer(
      receiver, this.value, { from: sender }
    );

    // Event assertions can verify that the arguments are the expected ones
    expectEvent(receipt, 'Transfer', {
      from: sender,
      to: receiver,
      value: this.value,
    });
  });

  it('updates balances on successful transfers', async function () {
    this.erc20.transfer(receiver, this.value, { from: sender });

    // BN assertions are automatically available via chai-bn (if using Chai)
    expect(await this.erc20.balanceOf(receiver))
      .to.be.bignumber.equal(this.value);
  });

});