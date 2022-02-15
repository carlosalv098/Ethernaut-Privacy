// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Attack {
    bytes4 constant UNLOCK = bytes4(keccak256('unlock(bytes16)'));

    function unlock(address _target, bytes32 _password) external {
        
        bytes16 password = bytes16(_password);
        (bool success, ) = _target.call(abi.encodeWithSelector(UNLOCK, password));
        require(success);
    }
}