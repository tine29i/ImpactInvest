# Documentation complète du projet Blockchain Investment Platform

## Table des matières
1. Vue d'ensemble du projet
2. Structure du projet
3. Frontend
   3.1. Configuration
   3.2. Composants principaux
   3.3. Intégration avec Web3
4. Backend
   4.1. Configuration du serveur
   4.2. Routes et contrôleurs
   4.3. Modèles de données
   4.4. Middleware
5. Blockchain
   5.1. Contrats intelligents
   5.2. Migration et déploiement
6. Configuration et démarrage du projet
7. Flux de travail typique
8. Considérations de sécurité
9. Améliorations futures

## 1. Vue d'ensemble du projet

La Blockchain Investment Platform est une application décentralisée (DApp) qui permet aux utilisateurs d'investir dans divers projets via la blockchain. Elle se compose de trois parties principales : un frontend React, un backend Express.js, et des contrats intelligents Solidity.

## 2. Structure du projet

```
blockchain-investment-platform/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── layout/
│   │   │       └── Header.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Invest.js
│   │   │   ├── Projects.js
│   │   │   └── Dashboard.js
│   │   ├── context/
│   │   │   └── Web3Context.js
│   │   └── App.js
│   ├── package.json
│   └── README.md
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── userController.js
│   │   ├── models/
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── userRoutes.js
│   │   │   ├── projectRoutes.js
│   │   │   └── investmentRoutes.js
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   └── server.js
│   ├── package.json
│   └── README.md
├── blockchain/
│   ├── contracts/
│   │   └── InvestmentPlatform.sol
│   ├── migrations/
│   │   └── 1_initial_migration.js
│   ├── test/
│   ├── truffle-config.js
│   └── README.md
└── README.md
```

## 3. Frontend

### 3.1. Configuration

Le frontend est une application React. Voici les principaux fichiers de configuration :

**package.json**
```json
{
  "name": "blockchain-investment-platform-frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "^5.2.0",
    "web3": "^1.5.2"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

**public/index.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blockchain Investment Platform</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

### 3.2. Composants principaux

**src/App.js**
```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Invest from './pages/Invest';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import { Web3Provider } from './context/Web3Context';

function App() {
  return (
    <Web3Provider>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/invest" component={Invest} />
            <Route path="/projects" component={Projects} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </Web3Provider>
  );
}

export default App;
```

**src/components/layout/Header.js**
```jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-purple-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Blockchain Invest</Link>
        <ul className="flex space-x-4">
          <li><Link to="/invest">Investir</Link></li>
          <li><Link to="/projects">Projets</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
```

**src/pages/Home.js**
```jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Bienvenue sur Blockchain Invest</h1>
      <p className="mb-4">Investissez dans des projets innovants grâce à la technologie blockchain.</p>
      <Link to="/invest" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
        Commencer à investir
      </Link>
    </div>
  );
};

export default Home;
```

### 3.3. Intégration avec Web3

**src/context/Web3Context.js**
```jsx
import React, { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          const accounts = await web3Instance.eth.getAccounts();
          setWeb3(web3Instance);
          setAccount(accounts[0]);
        } catch (error) {
          console.error("User denied account access");
        }
      }
      else if (window.web3) {
        const web3Instance = new Web3(window.web3.currentProvider);
        const accounts = await web3Instance.eth.getAccounts();
        setWeb3(web3Instance);
        setAccount(accounts[0]);
      }
      else {
        console.log('Non-Ethereum browser detected. Consider trying MetaMask!');
      }
    };

    initWeb3();
  }, []);

  return (
    <Web3Context.Provider value={{ web3, account }}>
      {children}
    </Web3Context.Provider>
  );
};
```

## 4. Backend

### 4.1. Configuration du serveur

**package.json**
```json
{
  "name": "blockchain-investment-platform-backend",
  "version": "1.0.0",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^5.12.3",
    "cors": "^2.8.5",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^8.5.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  }
}
```

**src/server.js**
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const investmentRoutes = require('./routes/investmentRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/investments', investmentRoutes);

// Error handling middleware
app.use(errorHandler);

// Database connection
mongoose.connect('mongodb://localhost/blockchain_invest', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
```

### 4.2. Routes et contrôleurs

**src/routes/userRoutes.js**
```javascript
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
```

**src/controllers/userController.js**
```javascript
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password, walletAddress } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, passwordHash, walletAddress });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
```

### 4.3. Modèles de données

**src/models/User.js**
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  walletAddress: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
```

### 4.4. Middleware

**src/middleware/errorHandler.js**
```javascript
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
};

module.exports = errorHandler;
```

## 5. Blockchain

### 5.1. Contrats intelligents

**contracts/InvestmentPlatform.sol**
```solidity
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
```

### 5.2. Migration et déploiement

**migrations/1_initial_migration.js**
```javascript
const InvestmentPlatform = artifacts.require("InvestmentPlatform");

module.exports = function(deployer) {
  deployer.deploy(InvestmentPlatform);
};
```

**truffle-config.js**
```javascript
module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",
     port: 7545,
     network_id: "*",
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
    }
  }
};
```

## 6. Configuration et démarrage du projet

1. Clonez le dépôt du projet.

2. Configuration du Frontend:
   ```
   cd frontend
   npm install
   npm start
   ```

3. Configuration du Backend:
   ```
   cd backend
   npm install
   npm start
   ```

4. Configuration de la Blockchain:
   ```
   cd blockchain
   npm install -g truffle
   truffle compile
   truffle migrate
   ```

5. Assurez-vous que MongoDB est installé et en cours 