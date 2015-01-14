var { getTransformForType } = require('./TransformStore')

function createRouteFromChild (child) {
  console.log(child.type.displayName)
  console.log(child.type.__reactRouterExtensionsID)
  var transform = getTransformForType(child)

  if (!transform) {
    throw new Error('ReactRouterExtensions could not transform `' + child.type.displayName + '`')
    return
  }

  return transform.apply(null, arguments)
}

module.exports = createRouteFromChild
