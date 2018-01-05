/*!
 * bcash.js - a javascript bitcoin library.
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License).
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcash-org/bcash
 */

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
bcash.blockchain = require('./blockchain');
bcash.Chain = require('./blockchain/chain');
bcash.ChainEntry = require('./blockchain/chainentry');

// BCH
bcash.btc = require('./btc');
bcash.Amount = require('./btc/amount');
bcash.URI = require('./btc/uri');

// Coins
bcash.coins = require('./coins');
bcash.Coins = require('./coins/coins');
bcash.CoinEntry = require('./coins/coinentry');
bcash.CoinView = require('./coins/coinview');

// HD
bcash.hd = require('./hd');
bcash.HDPrivateKey = require('./hd/private');
bcash.HDPublicKey = require('./hd/public');
bcash.Mnemonic = require('./hd/mnemonic');

// Mempool
bcash.mempool = require('./mempool');
bcash.Fees = require('./mempool/fees');
bcash.Mempool = require('./mempool/mempool');
bcash.MempoolEntry = require('./mempool/mempoolentry');

// Miner
bcash.mining = require('./mining');
bcash.Miner = require('./mining/miner');

// Net
bcash.net = require('./net');
bcash.packets = require('./net/packets');
bcash.Peer = require('./net/peer');
bcash.Pool = require('./net/pool');

// Node
bcash.node = require('./node');
bcash.Node = require('./node/node');
bcash.FullNode = require('./node/fullnode');
bcash.SPVNode = require('./node/spvnode');

// Primitives
bcash.primitives = require('./primitives');
bcash.Address = require('./primitives/address');
bcash.Block = require('./primitives/block');
bcash.Coin = require('./primitives/coin');
bcash.Headers = require('./primitives/headers');
bcash.Input = require('./primitives/input');
bcash.InvItem = require('./primitives/invitem');
bcash.KeyRing = require('./primitives/keyring');
bcash.MerkleBlock = require('./primitives/merkleblock');
bcash.MTX = require('./primitives/mtx');
bcash.Outpoint = require('./primitives/outpoint');
bcash.Output = require('./primitives/output');
bcash.TX = require('./primitives/tx');

// Protocol
bcash.protocol = require('./protocol');
bcash.consensus = require('./protocol/consensus');
bcash.Network = require('./protocol/network');
bcash.networks = require('./protocol/networks');
bcash.policy = require('./protocol/policy');

// Script
bcash.script = require('./script');
bcash.Opcode = require('./script/opcode');
bcash.Program = require('./script/program');
bcash.Script = require('./script/script');
bcash.ScriptNum = require('./script/scriptnum');
bcash.SigCache = require('./script/sigcache');
bcash.Stack = require('./script/stack');

// Utils
bcash.utils = require('./utils');
bcash.util = require('./utils/util');

// Wallet
bcash.wallet = require('./wallet');
bcash.WalletDB = require('./wallet/walletdb');

// Workers
bcash.workers = require('./workers');
bcash.WorkerPool = require('./workers/workerpool');

// Package Info
bcash.pkg = require('./pkg');
