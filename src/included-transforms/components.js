var FakeNode = {
  render () {
    return null
  }
}

var CollectionRoute = React.createClass({
  mixins: [FakeNode],

  getDefaultProps () {
    return {
      idParamName: 'id'
    }
  }
})

var ModelRoute = React.createClass({
  mixins: [FakeNode]
})

var ModelRoutes = React.createClass({
  mixins: [FakeNode]
})

var NamespaceRoute = React.createClass({
  mixins: [FakeNode]
})

module.exports = {
  CollectionRoute,
  ModelRoute,
  ModelRoutes,
  NamespaceRoute,
}
