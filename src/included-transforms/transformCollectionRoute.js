var { ModelRoutes } = require('../../src/included-transforms/components')
var { Route, DefaultRoute } = require('../../src/refs').ReactRouter
var createRoutesFromChildren = require('../../src/createRoutesFromChildren')
var prefixChildRouteProps = require('../prefixChildRouteProps')

function transformCollectionRouteWithoutWrapper (child, index) {
  var ret = []
  var handlers = child.props.handlers
  var children = []
  var modelRoutes
  var modelRoutesIndex

  React.Children.forEach(child.props.children, (c, i) => {
    if (c.type === ModelRoutes.type) {
      modelRoutesIndex = i
    } else {
      prefixChildRouteProps(c, {
        prefixPath: child.props.name,
        prefixName: child.props.name
      })
    }

    children.push(c)
  })

  if (modelRoutesIndex != null) {
    modelRoutes = children.splice(modelRoutesIndex, 1)[0]
    React.Children.forEach(modelRoutes.props.children, (c, i) => {
      prefixChildRouteProps(c, {
        prefixPath: `${child.props.name}/:${child.props.idParamName}`,
        prefixName: child.props.name
      })
      children.push(c)
    })
  }

  if (handlers.index) {
    ret.push(<Route
        name={`${child.props.name}/index`}
        path={child.props.name}
        handler={handlers.index}
        />)
  }

  if (handlers.search) {
    ret.push(<Route
        name={`${child.props.name}/search`}
        path={`${child.props.name}/search`}
        handler={handlers.search}
        />)
  }

  if (handlers.create) {
    ret.push(<Route
        name={`${child.props.name}/create`}
        path={`${child.props.name}/create`}
        handler={handlers.create}
        />)
  }

  if (handlers.show) {
    ret.push(<Route
        name={`${child.props.name}/show`}
        path={`${child.props.name}/:${child.props.idParamName}`}
        handler={handlers.show}
        />)
  }

  if (handlers.edit) {
    ret.push(<Route
        name={`${child.props.name}/edit`}
        path={`${child.props.name}/:${child.props.idParamName}/edit`}
        handler={handlers.edit}
        />)
  }

  //ret = ret.concat(createRoutesFromChildren(child.props.children))
  //console.log(children[0])
  return ret.concat(createRoutesFromChildren(children))
}

function transformCollectionRouteWithWrapper (child, index) {
  var ret = []
  var handlers = child.props.handlers
  var children = []
  var modelRoutes
  var modelRoutesIndex
  var defaultRoute
  //var indexRoute, searchRoute, defaultRoute

  React.Children.forEach(child.props.children, (c, i) => {
    if (c.type === ModelRoutes.type) {
      modelRoutesIndex = i
    } else {
      prefixChildRouteProps(c, {
        prefixPath: child.props.name,
        prefixName: child.props.name
      })
    }

    // TODO allow the user to supply their own DefaultRoute

    children.push(c)
  })

  if (modelRoutesIndex != null) {
    modelRoutes = children.splice(modelRoutesIndex, 1)[0]
    React.Children.forEach(modelRoutes.props.children, (c, i) => {
      prefixChildRouteProps(c, {
        prefixPath: `${child.props.name}/:${child.props.idParamName}`,
        prefixName: child.props.name
      })
      children.push(c)
    })
  }

  if (!defaultRoute) {
    if (handlers.index && handlers.search) {
      children.push(<DefaultRoute handler={handlers.index} />)
      children.push(<Route
          name={`${child.props.name}/search`}
          path={`search`}
          handler={handlers.search}
          />)
    } else {
      defaultRoute = handlers.index || handlers.search
      if (defaultRoute) {
        children.push(<DefaultRoute handler={defaultRoute} />)
      }
    }
  }

  if (handlers.create) {
    children.push(<Route
        name={`${child.props.name}/create`}
        path={`create`}
        handler={handlers.create}
        />)
  }

  if (handlers.show) {
    children.push(<Route
        name={`${child.props.name}/show`}
        path={`:${child.props.idParamName}`}
        handler={handlers.show}
        />)
  }

  if (handlers.edit) {
    children.push(<Route
        name={`${child.props.name}/edit`}
        path={`:${child.props.idParamName}/edit`}
        handler={handlers.edit}
        />)
  }

  return <Route
      name={child.props.name}
      handler={handlers.wrapper}>
    {createRoutesFromChildren(children)}
  </Route>

  //return []
}

function transformCollectionRoute (child, index) {
  if (child.props.handlers.wrapper) {
    return transformCollectionRouteWithWrapper.apply(null, arguments)
  } else {
    return transformCollectionRouteWithoutWrapper.apply(null, arguments)
  }
}

module.exports = transformCollectionRoute
