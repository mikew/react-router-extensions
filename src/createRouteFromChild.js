var { getTransformForType } = require('./TransformStore')

function createRouteFromChild (child) {
  var transform = getTransformForType(child)

  if (!transform) {
    throw new Error(`ReactRouterExtensions could not transform \`${child.type.displayName}\``)
    return
  }

  return transform.apply(null, arguments)
}

module.exports = createRouteFromChild
