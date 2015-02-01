var FakeNode = {
  render () {
    return null
  }
}

var CollectionRoute = React.createClass({ // jshint ignore:line
  mixins: [FakeNode],

  getDefaultProps () {
    return {
      idParamName: 'id'
    }
  }
})

var ModelRoute = React.createClass({ // jshint ignore:line
  mixins: [FakeNode]
})

var ModelRoutes = React.createClass({ // jshint ignore:line
  mixins: [FakeNode]
})

var NamespaceRoute = React.createClass({ // jshint ignore:line
  mixins: [FakeNode]
})

module.exports = {
  CollectionRoute,
  ModelRoute,
  ModelRoutes,
  NamespaceRoute,
}
