/* eslint-env mocha */
/* eslint prefer-arrow-callback: "off" */

'use strict';

const bio = require('bufio');
const assert = require('./util/assert');
const Output = require('../lib/primitives/output');
const Input = require('../lib/primitives/input');
const Outpoint = require('../lib/primitives/outpoint');
const CoinView = require('../lib/coins/coinview');
const CoinEntry = require('../lib/coins/coinentry');
const common = require('./util/common');
const Coin = require('../lib/primitives/coin');

const tx1 = common.readTX('tx1');
const coin1 = common.readFile('coin1.raw');

function reserialize(coin) {
  const raw = coin.toRaw();
  const entry = CoinEntry.fromRaw(raw);
  entry.raw = null;
  return CoinEntry.fromRaw(entry.toRaw());
}

function deepCoinsEqual(a, b) {
  assert.strictEqual(a.version, b.version);
  assert.strictEqual(a.height, b.height);
  assert.strictEqual(a.coinbase, b.coinbase);
  assert.bufferEqual(a.raw, b.raw);
}

describe('Coins', function() {
  it('should instantiate coinview from tx', () => {
    const [tx] = tx1.getTX();
    const hash = tx.hash('hex');
    const view = new CoinView();
    const prevout = new Outpoint(hash, 0);
    const input = Input.fromOutpoint(prevout);

    view.addTX(tx, 1);

    const coins = view.get(hash);
    assert.strictEqual(coins.outputs.size, tx.outputs.length);

    const entry = coins.get(0);
    assert(entry);

    assert.strictEqual(entry.version, 1);
    assert.strictEqual(entry.height, 1);
    assert.strictEqual(entry.coinbase, false);
    assert.strictEqual(entry.raw, null);
    assert.instanceOf(entry.output, Output);
    assert.strictEqual(entry.spent, false);

    const output = view.getOutputFor(input);
    assert(output);

    deepCoinsEqual(entry, reserialize(entry));
  });

  it('should spend an output', () => {
    const [tx] = tx1.getTX();
    const hash = tx.hash('hex');
    const view = new CoinView();

    view.addTX(tx, 1);

    const coins = view.get(hash);
    assert(coins);

    const length = coins.outputs.size;

    view.spendEntry(new Outpoint(hash, 0));

    assert.strictEqual(view.get(hash), coins);

    const entry = coins.get(0);
    assert(entry);
    assert(entry.spent);

    deepCoinsEqual(entry, reserialize(entry));
    assert.strictEqual(coins.outputs.size, length);

    assert.strictEqual(view.undo.items.length, 1);
  });

  it('should handle coin view', () => {
    const [tx, view] = tx1.getTX();

    const size = view.getSize(tx);
    const bw = bio.write(size);
    const raw = view.toWriter(bw, tx).render();
    const br = bio.read(raw);
    const res = CoinView.fromReader(br, tx);

    const prev = tx.inputs[0].prevout;
    const coins = res.get(prev.hash);

    assert.strictEqual(coins.outputs.size, 1);
    assert.strictEqual(coins.get(0), null);
    deepCoinsEqual(coins.get(1), reserialize(coins.get(1)));
  });

   it('should instantiate from tx', () => {
    const [tx] = tx1.getTX();
    const coin = Coin.fromTX(tx, 0, 0);

    assert.strictEqual(coin.getAddress().toString(),
      '3KUER9kZ693d5FQgvmr5qNDKnSpP9nXv9v');
    assert.strictEqual(coin.value, 5000000);
    assert.strictEqual(coin.getType(), 'multisig');
    assert.strictEqual(coin.version, 1);
    assert.strictEqual(coin.height, 0);
    assert.strictEqual(coin.coinbase, false);
    assert.strictEqual(coin.txid(),
      'ff80fe4937e2de16411c3a2bc534d661dc8b4f8aad75e6fbc4b1ec6060d9ef1c');
    assert.strictEqual(coin.index, 0);
  });

  it('should instantiate from raw', () => {
    const coin = Coin.fromRaw(coin1);

    assert.strictEqual(coin.getAddress().toString(),
      '3KUER9kZ693d5FQgvmr5qNDKnSpP9nXv9v');
    assert.strictEqual(coin.value, 5000000);
    assert.strictEqual(coin.getType(), 'multisig');
    assert.strictEqual(coin.version, 1);
    assert.strictEqual(coin.height, 0);
    assert.strictEqual(coin.coinbase, false);
    assert.strictEqual(coin.index, 0);
  });
});
