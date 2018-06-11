/* eslint-env mocha */
/* eslint prefer-arrow-callback: "off" */

'use strict';

const assert = require('assert');
const Chain = require('../lib/blockchain/chain');
const ChainEntry = require('../lib/blockchain/chainentry');
const Network = require('../lib/protocol/network');
const consensus = require('../lib/protocol/consensus');

const network = Network.get('main');

function random(max) {
  return Math.floor(Math.random() * max);
}

function fromU32(num) {
  const data = Buffer.allocUnsafe(4);
  data.writeUInt32LE(num, 0, true);
  return data;
}

function getEntry(prev, time, bits) {
  const entry = new ChainEntry();
  entry.height = prev.height + 1;
  entry.time = prev.time + time;
  entry.bits = bits;
  entry.chainwork = entry.getProof().add(prev.chainwork);
  return entry;

};


const chain = new Chain({
  memory: true,
  network
});

describe('Difficulty Adjustment Algorith', function () {
  it('should open the chain.', async () => {
    await chain.open();
  });

  it('should test cash difficulty', async () => {
    const target = network.pow.limit.ushrn(4);
    let bits = consensus.toCompact(target);

    chain.state.hasDAA();
    const blocks = {};

    blocks[0] = new ChainEntry();
    blocks[0].height = 0;
    blocks[0].time = 1269211443;
    blocks[0].bits = bits;
    blocks[0].chainwork = blocks[0].getProof();

    chain.getAncestor = async(entry, height) => {
      return blocks[height];
  }

    chain.getPrevious = async(entry) => {
      return blocks[entry.height - 1];
    };

    let i;

    for (i = 0; i < 2050; i++) {
      blocks[i] = getEntry(blocks[i - 1], 600, bits);
    }

    bits = await chain.getTarget(blocks[0].time, blocks[2049]);
  })
});
