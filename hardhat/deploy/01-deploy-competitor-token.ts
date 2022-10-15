import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../helper-functions"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import { ethers } from "hardhat"

const deployCompetitorToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  log("----------------------------------------------------")
  log("Deploying CompetitorToken and waiting for confirmations...")

  const totalCompetitors = 24
  const CompetitorToken = await deploy("CompetitorToken", {
    from: deployer,
    args: [24],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`CompetitorToken at ${CompetitorToken.address}`)
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(CompetitorToken.address, [])
  }
  log(`Delegating to ${deployer}`)
  await delegate(CompetitorToken.address, deployer)
  log("Delegated!")
}

const delegate = async (CompetitorTokenAddress: string, delegatedAccount: string) => {
  const CompetitorToken = await ethers.getContractAt("CompetitorToken", CompetitorTokenAddress)
  const transactionResponse = await CompetitorToken.delegate(delegatedAccount)
  await transactionResponse.wait(1)
  console.log(`Checkpoints: ${await CompetitorToken.numCheckpoints(delegatedAccount)}`)
}

export default deployCompetitorToken
deployCompetitorToken.tags = ["all", "governor"]
