var refs = require('./refs')

function setup (opts) {
  opts = opts || {}

  if (!opts.ReactRouter) {
    throw new Error('`ReactRouterExtensions.setup` needs `ReactRouter`')
  }

  refs.ReactRouter = opts.ReactRouter

  require('./setupTransformStore')()
}

module.exports = {
  setup,
  //addTransformForType,
  //getTransformForType,
  //createRoutesFromChildren,
  //createRouteFromChild,
}
