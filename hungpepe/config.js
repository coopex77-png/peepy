// Edit this and redeploy. Nothing else needs to change.
window.PEPE_CONFIG = {
  name: 'Pepe',                 // brand in the top-left
  ticker: 'PEPE',               // "Buy $PEPE"
  chain: 'solana',              // dexscreener chain id: solana, ethereum, base, bsc ...
  mint: '',                     // contract address. Empty = "waiting to launch"
  buy: '',                      // custom buy link. Empty = pump.fun/coin/<mint>
  model: '',                    // optional: '/assets/pepe.glb' to use a real model instead of the built-in one
  modelScale: 1,                // scale for the optional glb
  modelAnchor: [0, 0.9, 0.35],  // where the member attaches on the optional glb (scene units, after scaling & grounding)
};
