var TransformStore = require('./TransformStore')
var { ReactRouter } = require('./refs')

module.exports = function () {
  TransformStore.addTransformForType(ReactRouter.Route, (x) => x)
  TransformStore.addTransformForType(ReactRouter.DefaultRoute, (x) => x)
  TransformStore.addTransformForType(ReactRouter.NotFoundRoute, (x) => x)
  TransformStore.addTransformForType(ReactRouter.Redirect, (x) => x)
}
