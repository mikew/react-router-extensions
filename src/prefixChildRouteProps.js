function prefixChildRouteProps (child, { prefixName, prefixPath }) {
  var basePath = child.props.path || child.props.name

  if (prefixPath) {
    if (basePath[0] !== '/') {
      child.props.path = prefixPath + '/' + basePath
    }
  } else {
    child.props.path = basePath
  }

  if (prefixName) {
    child.props.name = prefixName + '/' + child.props.name
  }

  return child
}

module.exports = prefixChildRouteProps
