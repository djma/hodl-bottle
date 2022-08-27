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
        uint256 duration = 100;
        hodl.deposit{value: 1e18}(duration);
        assertEq(hodl.releaseTime(alice), 1000 + duration);
        assertEq(hodl.lockedBalance(alice), 1e18);
        assertEq(alice.balance, 0);

        // Withdrawing too soon
        //console.log(hodl.getReleaseTime(), block.timestamp);
        vm.expectRevert(bytes("You can only withdraw after release time"));
        hodl.withdraw();
        assertEq(alice.balance, 0);

        // Not allowed to set release time to something earlier
        vm.expectRevert(bytes("cannot move release time earlier"));
        hodl.deposit(0);

        vm.warp(block.timestamp + duration + 1);
        hodl.withdraw();

        assertEq(alice.balance, 1e18);
    }
}
