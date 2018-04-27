'use strict';

const BufferWriter = require('bufio').BufferWriter;
const StaticWriter = require('bufio').StaticWriter;
const common = require('../test/util/common');
const bench = require('./bench');

const tx3 = common.readTX('tx3');

{
  const [tx] = tx3.getTX();
  const end = bench('serialize (static-writer)');
  for (let i = 0; i < 10000; i++) {
    tx.refresh();
    const {size} = tx.getNormalSizes();
    const bw = new StaticWriter(size);
    tx.toNormalWriter(bw);
    bw.render();
  }
  end(10000);
}

{
  const [tx] = tx3.getTX();
  const end = bench('serialize (buffer-writer)');
  for (let i = 0; i < 10000; i++) {
    tx.refresh();
    const bw = new BufferWriter();
    tx.toNormalWriter(bw);
    bw.render();
  }
  end(10000);
}
