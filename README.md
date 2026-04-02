# CryptoCritters

**Your Portfolio Has Paws.** 🐾

A gamified BSC portfolio tracker where tokens become AI-generated critters. Health, happiness, and evolution depend on real market data + your DeFi actions.

## 🌟 Features

- 🔗 **Wallet Connect** - Connect your BSC wallet to scan holdings and generate personalized critters
- 🎨 **AI-Generated Critters** - Unique personalities and artwork based on token data
- 📊 **Real-Time Stats** - Health (price stability), Happiness (hold time), Energy (liquidity)
- 🎮 **Interactive Gameplay** - Feed, Play, Clean, and Train your critters to boost stats
- ✨ **Evolution System** - Hold tokens for 30+ days to unlock rare NFT badges and evolution forms
- 🧠 **Educational** - Learn DeFi mechanics through engaging gamified gameplay
- 📱 **Demo Mode** - Try without wallet connection using pre-loaded sample critters

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Blockchain**: ethers.js v6 for BNB Smart Chain interaction
- **APIs**: BSCScan API for on-chain data

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Web3**: ethers.js v6 for wallet connections

### AI & External Services
- **Avatar Generation**: HuggingFace API
- **Blockchain**: BNB Smart Chain (Testnet & Mainnet)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- BSC wallet (MetaMask, TrustWallet, etc.)

### Installation

```bash
# Clone the repository
git clone https://github.com/deekshith-b48/CryptoCritters.git
cd CryptoCritters

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running Locally

```bash
# Terminal 1: Start backend (runs on http://localhost:3001)
cd backend
npm run dev

# Terminal 2: Start frontend (runs on http://localhost:3000)
cd frontend
npm run dev
```

Visit `http://localhost:3000` in your browser to access the application.

## 📋 Environment Variables

### Backend (`backend/.env`)
```
REACT_APP_API_URL=http://localhost:3001
BSC_RPC_URL=https://bsc-dataseed1.bnbchain.org:8545
HUGGINGFACE_API_KEY=your_huggingface_key
```

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_CHAIN_ID=56
```

## 🎮 How to Play

1. **Connect Wallet** - Link your BSC wallet to import your token holdings
2. **Meet Your Critters** - Each token becomes a unique AI-generated critter
3. **Care for Critters** - Keep them happy by:
   - Feeding them (holding tokens)
   - Playing with them (frequent interactions)
   - Cleaning them (managing portfolio)
   - Training them (staking/providing liquidity)
4. **Earn NFT Badges** - Hold for 30+ days to unlock rare evolution forms
5. **Learn DeFi** - Understand market concepts through gameplay mechanics

## 📊 Critter Stats System

- **Health**: Decreases with high volatility, increases with stable prices
- **Happiness**: Grows with hold time, gains from user interactions
- **Energy**: Based on trading volume and liquidity availability
- **Rarity**: Determined by token market cap and holder distribution

## 🐳 Demo Mode

Try the app without wallet connection:
- Click "Demo Mode" button on the home page
- Load pre-configured sample critters
- All features available with mock data

## 📦 Project Structure

```
CryptoCritters/
├── backend/
│   ├── src/
│   │   ├── services/          # BSC, CritterEngine, CritterGenerator
│   │   ├── routes/            # API endpoints
│   │   ├── middleware/        # Error handling
│   │   ├── data/              # Mock data and seed
│   │   └── server.ts          # Express app
│   ├── dist/                  # Compiled JavaScript
│   └── package.json
├── frontend/
│   ├── app/                   # Next.js app directory
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   ├── public/                # Static assets
│   └── package.json
├── docker-compose.yml         # Docker setup
├── vercel.json               # Vercel deployment config
└── README.md                 # This file
```

## 🌐 Deployment

### Docker Setup
```bash
docker-compose up
```

### Vercel (Frontend)
```bash
vercel deploy
```

## 🔐 Security

- **Gas Optimization**: Batched contract calls to minimize fees
- **Rate Limiting**: API endpoints protected from abuse
- **Input Validation**: All wallet addresses and data validated

## 📝 API Endpoints

### Backend Routes (`/api`)
- `POST /api/critters/generate` - Generate critters from wallet
- `GET /api/critters/:walletAddress` - Fetch user's critters
- `POST /api/critters/:id/feed` - Feed a critter
- `POST /api/critters/:id/play` - Play with a critter
- `GET /api/health` - Health check

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Leaderboards and rankings
- [ ] Breeding system (combine tokens)
- [ ] Cross-chain support (Polygon, Arbitrum)
- [ ] NFT marketplace for critter trading
- [ ] DAO governance for game updates

## 🏆 Built for BNB Chain Hackathon

An innovative intersection of **AI**, **Gaming**, **DeFi**, and **Education** on **BNB Smart Chain**.

🤖 AI-Powered | 🎮 Gamified | ⛓️ BNB Chain | 📚 Educational | 🎨 Unique

## 📞 Contact & Support

- GitHub: [@deekshith-b48](https://github.com/deekshith-b48)
- Report Issues: [GitHub Issues](https://github.com/deekshith-b48/CryptoCritters/issues)

---

**Made with ❤️ by the CryptoCritters Team**
