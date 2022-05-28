async function main() {
    const LoanCollateralNFT = await ethers.getContractFactory("LoanCollateral")
  
    // Start deployment, returning a promise that resolves to a contract object
    const loanCollateralNFT = await LoanCollateralNFT.deploy()
    await loanCollateralNFT.deployed()
    console.log("Contract deployed to address:", loanCollateralNFT.address)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })