var createRouteFromChild = require('./createRouteFromChild')

function createRoutesFromChildren (children) {
  if (!children) {
    return []
  }

  var routes = []

  React.Children.forEach(children, (child, index) => {
    var created = createRouteFromChild.apply(null, arguments)

    if (child.props.key == null) {
      child.props.key = index
    }

    if (created) {
      routes = routes.concat(created)
    }
  })

  return routes
}

module.exports = createRoutesFromChildren
