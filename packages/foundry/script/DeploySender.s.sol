//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Sender} from "../contracts/Sender.sol";
import {ICrossDomainMessenger} from "../contracts/ICrossDomainMessenger.sol";
import "./DeployHelpers.s.sol";

contract DeploySender is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    function run() external {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }
        vm.startBroadcast(deployerPrivateKey);
        Sender sender = new Sender({
            _messenger: ICrossDomainMessenger(
                0x58Cc85b8D04EA49cC6DBd3CbFFd00B4B8D6cb3ef
            )
        });
        console.logString(
            string.concat("Sender deployed at: ", vm.toString(address(sender)))
        );
        vm.stopBroadcast();

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        exportDeployments();
    }
}
