# Decentralized Voting App

Welcome to the Decentralized Voting App! This project is a secure, blockchain-based voting system designed to ensure
transparency and prevent tampering. It consists of three main parts:

- **Smart Contract**: Written in Solidity and managed with Foundry, it runs locally using Anvil (a local Ethereum
  blockchain). The smart contract handles voting logic, allowing voters to cast votes for candidates (represented by
  Ethereum addresses) and provides functions to check the current voting state. It also emits events when the state
  changes. Only candidate addresses are stored in the smart contract.
- **Backend**: Built with Express.js and uses SQLite to store detailed candidate information (like names or
  descriptions) that the smart contract doesn’t handle.
- **Frontend**: Developed with React, TypeScript, and Vite, it provides an easy-to-use interface for voters and
  administrators to interact with the app.

This guide will walk you through setting up the project step-by-step on WSL, a Linux environment running within Windows.
Even if you’re new to development, follow along carefully, and you’ll have the app running in no time!

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setting Up Your WSL Environment](#setting-up-your-wsl-environment)
3. [Cloning the Repository](#cloning-the-repository)
4. [Setting Up the Smart Contract](#setting-up-the-smart-contract)
5. [Setting Up the Backend](#setting-up-the-backend)
6. [Setting Up the Frontend](#setting-up-the-frontend)
7. [Running the Application](#running-the-application)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before we start, make sure you have WSL set up on your Windows machine. If you don’t, follow
Microsoft’s [official WSL installation guide](https://learn.microsoft.com/en-us/windows/wsl/install) to install it (
Ubuntu is a great choice for this project). Once WSL is ready, you’ll need a few tools installed, which we’ll set up in
the next section.

You’ll also need:

- A web browser (like Chrome or Firefox) to install MetaMask and view the app.
- A basic text editor (like VS Code, Notepad, or Nano) to edit files.

---

## Setting Up Your WSL Environment

Let’s install the tools you’ll need: Node.js (for running the backend and frontend), PNPM (a package manager), and
Foundry (for the smart contract). Open your WSL terminal (e.g., Ubuntu) and follow these steps.

### 1. Install Node.js

Node.js lets us run JavaScript outside the browser, which is essential for this project.

```bash
# Update your package list to get the latest software
sudo apt update

# Install Node.js (version 16 or higher is recommended)
sudo apt install nodejs

# Check the version to confirm it’s installed
node --version
```

If you see a version number (e.g., `v16.13.0`), you’re good to go!

### 2. Install PNPM

PNPM is a tool that helps manage project dependencies efficiently.

```bash
# Install PNPM globally using npm (which comes with Node.js)
npm install -g pnpm

# Verify it’s installed
pnpm --version
```

You should see a version number (e.g., `7.0.0`). If not, double-check the command.

### 3. Install Foundry

Foundry is a toolkit for building and deploying Ethereum smart contracts. It includes Anvil, which we’ll use to run a
local blockchain.

```bash
# Install Foundry by downloading and running its installer
curl -L https://foundry.paradigm.xyz | bash

# Reload your terminal to update the PATH (so it knows where Foundry is)
source ~/.bashrc

# Update Foundry to the latest version
foundryup

# Check that everything installed correctly
forge --version
cast --version
anvil --version
```

If each command outputs a version number, Foundry is ready. If you run into issues, check
the [Foundry documentation](https://book.getfoundry.sh/getting-started/installation).

---

## Cloning the Repository

Now, let’s get the project files onto your machine.

```bash
# Clone the repository (replace 'your-username' with the actual GitHub username if needed)
git clone https://github.com/CharlesAgwuncha/CN6038-project.git

# Move into the project folder
cd CN6038-project
```

Inside this folder, you’ll see three subfolders:

- `dapp`: The smart contract code.
- `backend`: The Express.js server code.
- `frontend`: The React app code.

We’ll set them up in that order because the smart contract needs to be built first (it generates files the others rely
on).

---

## Setting Up the Smart Contract

The smart contract is the heart of the voting system, running on a local blockchain called Anvil.

### 1. Navigate to the `dapp` Folder

```bash
cd dapp
```

### 2. Start Anvil

Anvil creates a local Ethereum blockchain for testing.

```bash
anvil
```

This will keep running and show something like:

```
Available Accounts
==================
(0) 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
...

Private Keys
==================
(0) 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
...

Listening on 127.0.0.1:8545
```

- **Accounts**: These are fake Ethereum wallets with pretend ETH for testing.
- **Private Keys**: These are secret codes to access those wallets.
- **Listening on**: This is the address where Anvil is running (we’ll use it later).

**Action**: Pick one account and its private key (e.g., the first one). Copy them somewhere safe (like a text file)
because we’ll need them soon. Don’t stop Anvil—it needs to keep running.

### 3. Set Up Environment Variables

Since Anvil is running, open a **new WSL terminal window** (right-click the WSL app and select "New Window" or similar).
In this new terminal:

```bash
# Go back to the dapp folder
cd CN6038-project/dapp
```

Create a file called `.env` to store secret settings:

```bash
# Create the file (use nano, vim, or echo)
nano .env
```

Add these lines, using the private key and address you copied:

```env
PRIVATE_KEY=your_copied_private_key
SENDER_ADDRESS=your_copied_account_address
```

**Example**:

```env
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
SENDER_ADDRESS=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

Save and exit:

- If using `nano`, press `Ctrl + O`, Enter, then `Ctrl + X`.
- Or use your editor’s save method.

### 4. Build the Smart Contract

Still in the new terminal:

```bash
forge build
```

This compiles the smart contract into a format the blockchain can use and generates an ABI (a file that helps the
backend and frontend talk to the contract). If it says "Success," you’re on track.

### 5. Deploy the Smart Contract

Now, deploy it to Anvil:

```bash
cd script
./voting.deploy.sh
```

This script sends the contract to your local blockchain. When it finishes, it’ll show something like:

```
Deployed contract at: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

**Action**: Write down this contract address—you’ll need it for the frontend.

### 6. Update the Frontend Environment

Go to the `frontend` folder:

```bash
cd ../../frontend
```

Create or edit the `.env` file there:

```bash
nano .env
```

Add this line with your contract address:

```env
VITE_CONTRACT_ADDRESS=your_deployed_contract_address
```

**Example**:

```env
VITE_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
```

Save and exit.

---

## Setting Up the Backend

The backend stores extra candidate info and connects to the smart contract.

### 1. Open a New Terminal

Open another WSL terminal window (so Anvil keeps running).

### 2. Navigate to the `backend` Folder

```bash
cd CN6038-project/backend
```

### 3. Install Dependencies

```bash
pnpm install
```

This downloads all the libraries the backend needs. It might take a minute.

### 4. Set Up Environment Variables (Optional)

If you want the backend to run on a specific port (e.g., 4000 instead of the default), create a `.env` file:

```bash
nano .env
```

Add:

```env
PORT=your_desired_port
```

**Example**:

```env
PORT=4000
```

Save and exit. Skip this if you’re fine with the default port.

### 5. Create the Database

The backend uses SQLite, and Prisma sets it up:

```bash
pnpm gen:schema
```

This creates the database tables. If it runs without errors, it worked.

### 6. Start the Backend

```bash
pnpm dev
```

You’ll see something like:

```
Server running at http://localhost:4000
```

**Action**: Note this URL (it might use a different port if you set one). This is where the backend lives.

### 7. Update Frontend Environment

Back in the `frontend` folder (open it in another terminal if needed):

```bash
cd ../frontend
nano .env
```

Add the backend URL to your `.env` file:

```env
VITE_BACKEND_URL=your_backend_base_url
```

**Example**:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Save and exit. Your `.env` should now have both `VITE_CONTRACT_ADDRESS` and `VITE_BACKEND_URL`.

---

## Setting Up the Frontend

The frontend is what you’ll see in your browser.

### 1. Open a New Terminal

Open yet another WSL terminal window.

### 2. Navigate to the `frontend` Folder

```bash
cd CN6038-project/frontend
```

### 3. Install MetaMask

MetaMask is a browser extension that lets you interact with the blockchain.

- Open your browser (e.g., Chrome or Firefox).
- Go to [metamask.io/download.html](https://metamask.io/download.html).
- Click “Install MetaMask for [Your Browser]” and follow the prompts to add it.
- Set up a wallet if prompted, but we’ll replace it with Anvil’s wallet next.

### 4. Configure MetaMask with Anvil

Since we’re using a local blockchain, we need to connect MetaMask to Anvil.

#### 4.1. Add the Anvil Network

- Click the MetaMask icon in your browser.
- Click the network dropdown (it might say “Ethereum Mainnet”).
- Select “Add Network” > “Add a network manually”.
- Fill in:
    - **Network Name**: `Anvil Local`
    - **New RPC URL**: `http://127.0.0.1:8545` (check your Anvil terminal to confirm this)
    - **Chain ID**: `31337` (Anvil’s default)
    - **Currency Symbol**: `ETH`
- Click “Save”.

#### 4.2. Switch to Anvil

- In the network dropdown, select “Anvil Local”. If it connects, you’re set.

#### 4.3. Import an Anvil Wallet

We’ll use one of Anvil’s test accounts:

- In MetaMask, click the account icon (top-right circle).
- Select “Import Account”.
- Paste a private key from your Anvil output (e.g.,
  `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`).
    - **Admin Tip**: If you want to be the election manager/admin, use the `PRIVATE_KEY` from `dapp/.env`. Otherwise,
      pick any other key from Anvil for a regular voter.
- Click “Import”.

#### 4.4. Switch to the Wallet

- Make sure the imported account is selected in MetaMask. You should see its address and a balance of 10,000 ETH (fake
  money from Anvil).

### 5. Install Frontend Dependencies

Back in your terminal:

```bash
pnpm install
```

This grabs all the libraries the frontend needs.

### 6. Start the Frontend

```bash
pnpm dev
```

It’ll output something like:

```
VITE v4.0.0  ready in 300 ms
  ➜  Local:   http://localhost:5173/
```

Open this URL (e.g., `http://localhost:5173/`) in your browser to see the app.

---

## Running the Application

You should now have three terminal windows running:

1. **Anvil**: The local blockchain (`anvil` in `dapp`).
2. **Backend**: The server (`pnpm dev` in `backend`).
3. **Frontend**: The React app (`pnpm dev` in `frontend`).

In your browser (with MetaMask on “Anvil Local” and the right wallet selected), visit the frontend URL. You can:

- Cast votes as a voter.
- Manage the election if you’re using the admin wallet.

---

## Troubleshooting

- **MetaMask Won’t Connect**: Ensure you’re on “Anvil Local” and Anvil is running. Check the RPC URL matches.
- **“Contract Not Found”**: Verify `VITE_CONTRACT_ADDRESS` in `frontend/.env` matches the deployed address.
- **Backend Errors**: Confirm `VITE_BACKEND_URL` is correct and the backend is running.
- **Still Stuck?**: Check each terminal for error messages and retrace the steps.

---

Thank you for setting up the Decentralized Voting App! If you need help, feel free to ask. Enjoy exploring this secure
voting system!