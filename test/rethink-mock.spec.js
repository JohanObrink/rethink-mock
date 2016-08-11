const chai = require('chai')
const expect = chai.expect
const { mock } = require(process.cwd() + '/lib/rethink-mock')

chai.use(require('sinon-chai'))

describe('rethink-mock', () => {
  let r, list, obj
  beforeEach(() => {
    r = mock()
    list = ['foo', 'bar']
    obj = {foo: 'bar'}
  })
  describe('#connect', () => {
    it('works as a spy', () => {
      r.connect({foo: 'bar'})
      expect(r.connect).calledOnce.calledWith({foo: 'bar'})
    })
    it('resolves a connection', () => {
      return r.connect()
        .then(function (conn) {
          expect(conn).to.equal(r.mock.connection)
        })
    })
  })
  describe('#db', () => {
    describe('with db: true', () => {
      beforeEach(() => {
        r = mock({db: true})
      })
      it('works as a spy', () => {
        r.db('foo')
        expect(r.db).calledOnce.calledWith('foo')
      })
      it('returns the correct methods', () => {
        const db = r.db()
        expect(db.table, 'db.table').to.be.a('function')
        expect(db.tableCreate, 'db.tableCreate').to.be.a('function')
        expect(db.tableDrop, 'db.tableDrop').to.be.a('function')
        expect(db.tableList, 'db.tableList').to.be.a('function')
      })
      it('exposes table correctly', () => {
        return r.db('foo').table('bar').run()
      })
    })
    describe('with db:false', () => {
      it('throws', () => {
        expect(() => r.db()).to.throw()
      })
    })
  })
  describe('#queries', () => {
    it('.table', () => {
      r.mock.run.resolves(list)
      return r.table('foo')
        .run()
        .then(res => expect(res).to.equal(list))
    })
    it('.table.get', () => {
      r.mock.run.resolves(obj)
      return r.table('foo')
        .get('bar')
        .run()
        .then(res => expect(res).to.equal(obj))
    })
    it('.table.getAll', () => {
      r.mock.run.resolves(list)
      return r.table('foo')
        .getAll('bar', {index: 'bar'})
        .run()
        .then(res => expect(res).to.equal(list))
    })
    it('.table.insert', () => {
      r.mock.run.resolves(obj)
      return r.table('foo')
        .insert({herp: 'derp'})
        .run()
        .then(res => expect(res).to.equal(obj))
    })
  })
})
