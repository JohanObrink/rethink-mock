'use strict'
const { stub, spy } = require('sinon')
require('sinon-as-promised')

function mock (options = {}) {
  const runnable = {
    run: stub().resolves()
  }
  const query = Object.assign(stub(), {
    merge: spy(() => query),
    filter: spy(() => query),
    map: spy(() => query),
    reduce: spy(() => query),
    slice: spy(() => query),
    limit: spy(() => query),
    pluck: spy(() => query),
    sum: spy(() => query),
    count: spy(() => query),
    coerceTo: spy(() => query),
    each: spy(() => query),
    eq: spy(() => query),
    ne: spy(() => query),
    gt: spy(() => query),
    lt: spy(() => query),
    and: spy(() => query),
    or: spy(() => query),
    changes: spy(() => query),
    replace: spy(() => query),
    without: spy(() => query),
    withFields: spy(() => query)
  }, runnable)
  query.returns(query)

  const EventEmitter = {
    addListener: stub(),
    on: stub(),
    once: stub(),
    removeListener: stub(),
    removeAllListeners: stub(),
    setMaxListeners: stub(),
    listeners: stub(),
    emit: stub()
  }

  const connection = Object.assign({
    close: stub().resolves(),
    reconnect: stub().resolves()
  }, EventEmitter)

  const table = Object.assign(stub(), {
    insert: spy(() => query),
    get: spy(() => query),
    getAll: spy(() => query)
  }, query, runnable)
  table.returns(table)

  const db = {
    table,
    tableCreate: stub().returns(query),
    tableDrop: stub().returns(query),
    tableList: stub().returns(query),
    do: stub().returns(query)
  }

  const r = Object.assign({
    connection,
    connect: stub().resolves(connection),
    expr: spy(() => query),
    row: spy(() => query),
    mock: {
      run: query.run,
      connection: connection
    }
  }, db)

  if (options.db) {
    r.db = Object.assign(stub().returns(db), db)
  }

  return r
}

module.exports = {mock}
