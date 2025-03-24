// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {CommonBase} from "../lib/forge-std/src/Base.sol";
import {Script} from "../lib/forge-std/src/Script.sol";
import {StdChains} from "../lib/forge-std/src/StdChains.sol";
import {StdCheatsSafe} from "../lib/forge-std/src/StdCheats.sol";
import {StdUtils} from "../lib/forge-std/src/StdUtils.sol";
import {console} from "../lib/forge-std/src/console.sol";
import {Voting} from "../src/Voting.sol";

contract VotingScript is Script {
    function run() external {
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));
        Voting voting = new Voting();
        vm.stopBroadcast();

        console.log("Voting deployed to:", address(voting));
    }
}