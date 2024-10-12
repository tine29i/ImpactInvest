// blockchain/contracts/InvestmentPlatform.sol
pragma solidity ^0.8.0;

contract InvestmentPlatform {
    struct Project {
        address owner;
        string name;
        uint256 fundingGoal;
        uint256 currentFunding;
        bool isActive;
    }

    mapping(uint256 => Project) public projects;
    uint256 public projectCount;

    event ProjectCreated(uint256 projectId, string name, uint256 fundingGoal);
    event InvestmentMade(uint256 projectId, address investor, uint256 amount);

    function createProject(string memory _name, uint256 _fundingGoal) public {
        projectCount++;
        projects[projectCount] = Project(msg.sender, _name, _fundingGoal, 0, true);
        emit ProjectCreated(projectCount, _name, _fundingGoal);
    }

    function invest(uint256 _projectId) public payable {
        Project storage project = projects[_projectId];
        require(project.isActive, "Project is not active");
        require(msg.value > 0, "Investment amount must be greater than 0");

        project.currentFunding += msg.value;
        emit InvestmentMade(_projectId, msg.sender, msg.value);

        if (project.currentFunding >= project.fundingGoal) {
            project.isActive = false;
        }
    }
}