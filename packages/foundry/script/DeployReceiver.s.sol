//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Receiver} from "../contracts/Receiver.sol";
import {ICrossDomainMessenger} from "../contracts/ICrossDomainMessenger.sol";
import "./DeployHelpers.s.sol";

contract DeployReceiver is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    function run() external {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }
        vm.startBroadcast(deployerPrivateKey);
        Receiver receiver = new Receiver({
            _messenger: ICrossDomainMessenger(
                0x4200000000000000000000000000000000000007
            ),
            _sender: 0x93De600D3a94121501BE3E19b9693C1D796f20df // pass the address of the deployed sender contract
        });
        console.logString(
            string.concat(
                "Receiver deployed at: ", vm.toString(address(receiver))
            )
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
