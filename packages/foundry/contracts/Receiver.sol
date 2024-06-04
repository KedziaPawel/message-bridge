//SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {ICrossDomainMessenger} from "./ICrossDomainMessenger.sol";

contract Receiver {
    ICrossDomainMessenger public immutable MESSENGER;
    address public immutable SENDER;

    event MessageReceived(string message);

    constructor(ICrossDomainMessenger _messenger, address _sender) {
        MESSENGER = _messenger;
        SENDER = _sender;
    }

    function receiveMessage(string calldata _message) external {
        require(msg.sender == address(MESSENGER), "NOT_CROSS_DOMAIN_MESSENGER");
        require(
            MESSENGER.xDomainMessageSender() == SENDER, "NOT_AUTHORIZED_SENDER"
        );
        emit MessageReceived(_message);
    }
}
