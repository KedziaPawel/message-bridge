//SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Receiver} from "./Receiver.sol";
import {ICrossDomainMessenger} from "./ICrossDomainMessenger.sol";

contract Sender {
    ICrossDomainMessenger public immutable MESSENGER;

    constructor(ICrossDomainMessenger _messenger) {
        MESSENGER = _messenger;
    }

    function send(
        string calldata _message,
        address _target,
        uint32 _gasLimit
    ) external {
        MESSENGER.sendMessage({
            _target: _target,
            _message: abi.encodeWithSelector(
                Receiver.receiveMessage.selector, _message
            ),
            _minGasLimit: _gasLimit
        });
    }
}
