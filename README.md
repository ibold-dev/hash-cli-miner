# HASH256 GPU Miner

HASH256 proof-of-work CLI miner using NVIDIA CUDA GPU.

**RTX 4090 Test Result: ~4.6 GH/s**

## Nuggets

```
keccak256(challenge || nonce) < difficulty
```

Contract Address (Ethereum mainnet): `0xAC7b5d06fa1e77D08aea40d46cB7C5923A87A0cc`

## Installation

Requirements: Node.js, CUDA Toolkit (nvcc), NVIDIA Drivers

```bash
git clone https://github.com/fanqieBTC/hash256-cli.git
cd hash256-cli
npm install
npm run assets
npm run build:cuda
```

Other GPU builds (default `sm_89` is for RTX 4090):

```bash
CUDA_ARCH=sm_86 sh build-cuda.sh   # RTX 3090
CUDA_ARCH=sm_80 sh build-cuda.sh   # A100
```

## Configuration procedures

```bash
cp .env.example .env
nano .env
```

```text
HASH256_RPC_URL=https://rpc.mevblocker.io/fast
PRIVATE_KEY=0xYourPrivateKey
```

## Usage

Check on-chain status:

```bash
node hash256-cli.js status
```

Benchmark:

```bash
node hash256-cli.js bench --engine cuda --seconds 10
```

Mining (submitting transactions):

```bash
node hash256-cli.js mine --engine cuda --submit --loop
```

Mining without submitting:

```bash
node hash256-cli.js mine --address 0xYourAddress --engine cuda --loop
```

## Ubuntu Server (systemd)

```bash
cp .env.example .env && nano .env
bash scripts/install-linux-service.sh
journalctl -u hash256-miner -f
```

## Process Management (PM2)

Using [PM2](https://pm2.keymetrics.io/) is recommended to keep the miner running in the background and auto-restart it if it crashes.

```bash
# 1. Install PM2 globally (if you haven't already)
npm install -g pm2

# 2. Start the miner using the ecosystem config
pm2 start ecosystem.config.cjs

# 3. View the live logs
pm2 logs hash256-miner

# 4. (Optional) Save the process list so it restarts on server reboot
pm2 save
pm2 startup
```

## Stop

```bash
# Stop systemd service
sudo systemctl stop hash256-miner

# Or stop PM2 process
pm2 stop hash256-miner

# Or kill manually
pkill -f hash256-cuda-miner
```
