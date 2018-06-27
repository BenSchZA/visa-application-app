pragma solidity ^0.4.22;

/// @title Visa Application contract.
contract VisaApplicationContract {
    //TODO: Change string to bytes32 for production

    Applicant public applicant;
    Application public application;

    struct Applicant {
        address addr;

        bytes32 name;
        uint256 id;
        uint256 birthDate;

        bool applied;
    }

    struct Application {
        bytes32 destination;
        uint256 arrivalDate;
        uint256 departureDate;

        bool submitted;
    }

    event Updating(address sender);
    event Applying(address sender);
    event Applied(address sender);
    event Submitted(address sender);

    constructor(bytes32 name, uint256 id, uint256 birthDate) public {
        require(name != 0 && id != 0 && birthDate != 0, "Please supply all personal details.");

        applicant.addr = msg.sender;
        applicant.name = name;
        applicant.id = id;
        applicant.birthDate = birthDate;
    }

    modifier onlyApplicant(){
        assert(applicant.addr == msg.sender);
        _;
    }

    function apply(bytes32 destination, uint256 arrivalDate, uint256 departureDate) onlyApplicant public returns (bool success) {
        require(!application.submitted, "Visa application already submitted.");

        if (applicant.applied == true) {
            emit Updating(msg.sender);
        } else {
            emit Applying(msg.sender);
        }

        application.destination = destination;
        application.arrivalDate = arrivalDate;
        application.departureDate = departureDate;

        emit Applied(msg.sender);

        applicant.applied = true;
        return true;
    }

    function submit() onlyApplicant public returns (bool success) {
        require(applicant.applied, "Apply for visa application first.");
        require(!application.submitted, "Visa application already submitted.");

        emit Submitted(msg.sender);

        application.submitted = true;
        return true;
    }
}