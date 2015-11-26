var assert = require('assert')

var plugin = require('../')

describe('Plugin name', function () {
  it('should have a name', function () {
    assert(plugin.name)
  })

  it('should have a name equal at package.json', function () {
    var pkg = require('../package.json')
    assert(plugin.name, pkg.name)
  })
})
