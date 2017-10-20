pragma solidity ^0.4.11;

import "./HumanStandardToken.sol";


contract EIP621AbstractToken is HumanStandardToken {
    /// @notice increase this token's total supply by `value` and give the new
    /// tokens to `to`
    /// @dev increases the token's totalSupply
    /// @param value the number of tokens to increase the total supply by
    /// @param to the address whose balance the new tokens will be attributed
    function increaseSupply(uint value, address to) public;

    function safeAdd(uint a, uint b) internal returns (uint);

    /// @notice decrease this token's total supply by `value` and deduct the
    /// tokens from the balance of `from`
    /// @dev decrease the token's totalSupply
    /// @param value the number of tokens to decrease the total supply by
    /// @param from the address from whose balance the tokens will be deducted
    function decreaseSupply(uint value, address from) public;

    function safeSub(uint a, uint b) internal returns (uint);
}
