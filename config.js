// Edit this and redeploy. Nothing else needs to change.
window.PEPE_CONFIG = {
  name: 'peepee',               // brand in the top-left
  ticker: 'PEEPEE',             // "Buy $PEEPEE"
  chain: 'solana',              // dexscreener chain id: solana, ethereum, base, bsc ...
  mint: '',                     // contract address. Empty = "waiting to launch"
  buy: '',                      // custom buy link. Empty = pump.fun/coin/<mint>
  // On-chain source for launchpad tokens the aggregators haven't indexed yet (Raydium LaunchLab / bonk.fun style pools).
  // pool = the LaunchLab PoolState account, quote = the pool's quote mint (SOL, USD1, PEPE ...). Leave empty to skip.
  pool: '',
  quote: '',
  rpc: 'https://solana-rpc.publicnode.com',
  model: '',                    // optional: '/assets/pepe.glb' to use a real model instead of the built-in one
  modelScale: 1,                // scale for the optional glb
  modelAnchor: [0, 0.9, 0.35],  // where the member attaches on the optional glb (scene units, after scaling & grounding)
};
