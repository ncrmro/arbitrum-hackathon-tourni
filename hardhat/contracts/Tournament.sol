// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract TournamentMatch {
    address[2]  public competitors;
    address winner;
    constructor(
        address[2] memory _competitors
    )  {
        competitors = _competitors;
    }
}

contract Tournament {
    string public name;
    uint256 public registrationCloseTime;
    uint256 public startTime;
    address[] public competitors;
    TournamentMatch[] public epocMatches;

    constructor(
        string memory _name,
        uint256 _registrationCloseTime,
        uint256 _startTime
    )  {
        name = _name;
        require(_startTime > _registrationCloseTime, "Tournament start time must be after registration close time");
        registrationCloseTime = _registrationCloseTime;
        startTime = _startTime;
    }

    function registerCompetitor(address _address) public {
        // need to ensure address is not already registered
        competitors.push(_address);
    }

    /*
    Iterate over competitors two at a time to generate the match contracts
    */
    function deployEpochMatches() public {
        require(block.timestamp > registrationCloseTime, "Can't deploy tournament matches before registration close time");
        uint8 matchIndex = 0;

        while (matchIndex < competitors.length) {
            TournamentMatch matchContractAddress = new TournamentMatch([competitors[matchIndex], competitors[matchIndex + 1]]);
            epocMatches.push(matchContractAddress);
            matchIndex = matchIndex + 2;
        }
    }
}
