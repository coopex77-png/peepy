// Edit this and redeploy. Nothing else needs to change.
window.PEPE_CONFIG = {
  name: 'peepy',                // brand in the top-left
  ticker: 'PEEPY',              // "Buy $PEEPY"
  chain: 'solana',              // dexscreener chain id: solana, ethereum, base, bsc ...
  mint: '8h4CNjYqV2jtewVvBw7v8DVmC8j6tE8uD5RYHrRVpump', // contract address. Empty = "waiting to launch"
  buy: '',                      // custom buy link. Empty = pump.fun/coin/<mint>
  model: '',                    // optional: '/assets/pepe.glb' to use a real model instead of the built-in one
  modelScale: 1,                // scale for the optional glb
  modelAnchor: [0, 0.9, 0.35],  // where the member attaches on the optional glb (scene units, after scaling & grounding)
};
