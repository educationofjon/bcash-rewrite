/*!
 * bcash.js - a javascript bitcoin library.
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License).
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License)
 * Copyright (c) 2017-2018, Jonathan Gonzalez (MIT License).
 * https://github.com/bcash-org/bcoin-abc
 */

/* eslint prefer-arrow-callback: "off" */

'use strict';

/**
 * A bcash "environment" which exposes all
 * constructors for primitives, the blockchain,
 * mempool, wallet, etc. It also exposes a
 * global worker pool.
 *
 * @exports bcash
 * @type {Object}
 */

const bcash = exports;

/**
 * Define a module for lazy loading.
 * @param {String} name
 * @param {String} path
 */

bcash.define = function define(name, path) {
  let cache = null;
  Object.defineProperty(bcash, name, {
    get() {
      if (!cache)
        cache = require(path);
      return cache;
    }
  });
};

/**
 * Set the default network.
 * @param {String} network
 */

bcash.set = function set(network) {
  bcash.Network.set(network);
  return bcash;
};

/*
 * Expose
 */

// Blockchain
bcash.define('blockchain', './blockchain');
bcash.define('Chain', './blockchain/chain');
bcash.define('ChainEntry', './blockchain/chainentry');

// BCH
bcash.define('btc', './btc');
bcash.define('Amount', './btc/amount');
bcash.define('URI', './btc/uri');

// Coins
bcash.define('coins', './coins');
bcash.define('Coins', './coins/coins');
bcash.define('CoinEntry', './coins/coinentry');
bcash.define('CoinView', './coins/coinview');

// HD
bcash.define('hd', './hd');
bcash.define('HDPrivateKey', './hd/private');
bcash.define('HDPublicKey', './hd/public');
bcash.define('Mnemonic', './hd/mnemonic');

// Mempool
bcash.define('mempool', './mempool');
bcash.define('Fees', './mempool/fees');
bcash.define('Mempool', './mempool/mempool');
bcash.define('MempoolEntry', './mempool/mempoolentry');

// Miner
bcash.define('mining', './mining');
bcash.define('Miner', './mining/miner');

// Net
bcash.define('net', './net');
bcash.define('packets', './net/packets');
bcash.define('Peer', './net/peer');
bcash.define('Pool', './net/pool');

// Node
bcash.define('node', './node');
bcash.define('Node', './node/node');
bcash.define('FullNode', './node/fullnode');
bcash.define('SPVNode', './node/spvnode');

// Primitives
bcash.define('primitives', './primitives');
bcash.define('Address', './primitives/address');
bcash.define('Block', './primitives/block');
bcash.define('Coin', './primitives/coin');
bcash.define('Headers', './primitives/headers');
bcash.define('Input', './primitives/input');
bcash.define('InvItem', './primitives/invitem');
bcash.define('KeyRing', './primitives/keyring');
bcash.define('MerkleBlock', './primitives/merkleblock');
bcash.define('MTX', './primitives/mtx');
bcash.define('Outpoint', './primitives/outpoint');
bcash.define('Output', './primitives/output');
bcash.define('TX', './primitives/tx');

// Protocol
bcash.define('protocol', './protocol');
bcash.define('consensus', './protocol/consensus');
bcash.define('Network', './protocol/network');
bcash.define('networks', './protocol/networks');
bcash.define('policy', './protocol/policy');

// Script
bcash.define('script', './script');
bcash.define('Opcode', './script/opcode');
bcash.define('Program', './script/program');
bcash.define('Script', './script/script');
bcash.define('ScriptNum', './script/scriptnum');
bcash.define('SigCache', './script/sigcache');
bcash.define('Stack', './script/stack');

// Utils
bcash.define('utils', './utils');
bcash.define('util', './utils/util');

// Wallet
bcash.define('wallet', './wallet');
bcash.define('Path', './wallet/path');
bcash.define('WalletKey', './wallet/walletkey');
bcash.define('WalletDB', './wallet/walletdb');

// Workers
bcash.define('workers', './workers');
bcash.define('WorkerPool', './workers/workerpool');

// Package Info
bcash.define('pkg', './pkg');
