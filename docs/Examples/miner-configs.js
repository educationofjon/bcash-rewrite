'use strict';

const bcash = require('../..');
const KeyRing = bcash.keyring;
const WorkerPool = bcash.workerpool;
const Chain = bcash.chain;
const Miner = bcash.miner;

const key = KeyRing.generate('regtest');

const workers = new WorkerPool({
  enabled: true
});

const chain = new Chain({
  network: 'regtest',
  workers: workers
});

const miner = new Miner({
  chain: chain,
  addresses: [key.getAddress()],
  coinbaseFlags: 'my-miner',
  workers: workers
});

(async () => {
  await miner.open();

  const tmpl = await miner.createBlock();

  console.log('Block template:');
  console.log(tmpl);

  const job = await miner.createJob();
  const block = await job.mineAsync();

  console.log('Mined block:');
  console.log(block);
  console.log(block.txs[0]);

  await chain.add(block);

  console.log('New tip:');
  console.log(chain.tip);
})().catch((err) => {
  console.error(err.stack);
  process.exit(1);
});
