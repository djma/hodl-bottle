// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Hodl.sol";

contract HodlTest is Test {
    Hodl public hodl;
    address alice = address(123);

    function setUp() public {
        hodl = new Hodl();

        vm.startPrank(alice);
        vm.deal(alice, 1 ether);
        assertEq(alice.balance, 1 ether);
    }

    function testDeposit() public {
        vm.warp(1000);
        hodl.deposit{value: 1e18}();
        assertEq(hodl.getReleaseTime(), 1000 + 100);
        assertEq(hodl.getBalance(), 1e18);
        assertEq(alice.balance, 0);
    }

    function testWithdraw() public {
        testDeposit();

        // Withdrawing too soon
        //console.log(hodl.getReleaseTime(), block.timestamp);
        vm.expectRevert(bytes("You can only withdraw after 100 seconds"));
        hodl.withdraw();
        assertEq(alice.balance, 0);

        vm.warp(block.timestamp + 100 + 1);
        hodl.withdraw();

        assertEq(alice.balance, 1e18);
    }
}
