# 🌉 Message Bridge

This project lets you send messages between two different networks. The sender contract is deployed on the Sepolia network and the receiver contract is deployed on the Optimism Sepolia network. The sender contract sends a message to the receiver contract and the receiver contract receives the message.

## Overview
The project is a PoC. It uses [Scaffold ETH 2](https://github.com/scaffold-eth/scaffold-eth-2) as a boilerplate to speed up prototyping time.
The smart contract part is inside [contracts](https://github.com/KedziaPawel/message-bridge/tree/main/packages/foundry/contracts). The frontend part is in the [main page](https://github.com/KedziaPawel/message-bridge/blob/main/packages/nextjs/app/page.tsx).

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

1. Install dependencies:

```
yarn install
```

2. Start your NextJS app:

```
yarn start
```

Visit your app at: `http://localhost:3000`.

## How to run deployment scripts

This step is not necessary, as the contracts are already deployed. However, if you want to deploy the contracts, you can follow the steps below.

Deploy Sender.sol to Sepoplia

```
forge script --chain sepolia script/DeploySender.s.sol:DeploySender --rpc-url https://eth-sepolia.g.alchemy.com/v2/API_KEY --broadcast --verify -vvvv
```

Deploy Receiver.sol to Sepolia. Before deploying change in the `DeployReceiver.s.sol` the address of the sender contract to the address of the sender contract deployed in the previous step.

```
forge script --chain optimism-sepolia script/DeployReceiver.s.sol:DeployReceiver  --rpc-url https://opt-sepolia.g.alchemy.com/v2/API_KEY --broadcast --verify -vvvv
```

After the deployment place the addresses of the contracts in the `contracts.ts` file.
