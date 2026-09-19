// Edit this and redeploy. Nothing else needs to change.
window.PEPE_CONFIG = {
  name: 'peepy',                // brand in the top-left
  ticker: 'PEEPY',              // "Buy $PEEPY"
  chain: 'solana',              // dexscreener chain id: solana, ethereum, base, bsc ...
  mint: 'CJF1M2m9xHWieQabyJkAja5fi6bieZ1hdcKrqVjwv7EY', // contract address. Empty = "waiting to launch"
  buy: '',                      // custom buy link. Empty = pump.fun/coin/<mint>
  // On-chain source for launchpad tokens the aggregators haven't indexed yet (Raydium LaunchLab / bonk.fun style pools).
  // pool = the LaunchLab PoolState account, quote = the pool's quote mint (SOL, USD1, PEPE ...). Leave empty to skip.
  pool: 'B9MKmdP22d1MSvxxzQmeroovmBqQsJXSVH5BVuMK1mxG',
  quote: 'PEPEqnuuCDbBC89p1u9vpnP1KQ2oj1xTcQBsjt9X55m',
  rpc: 'https://solana-rpc.publicnode.com',
  model: '',                    // optional: '/assets/pepe.glb' to use a real model instead of the built-in one
  modelScale: 1,                // scale for the optional glb
  modelAnchor: [0, 0.9, 0.35],  // where the member attaches on the optional glb (scene units, after scaling & grounding)
};
