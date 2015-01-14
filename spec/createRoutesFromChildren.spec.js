var createRoutesFromChildren = require('../src/createRoutesFromChildren')
var {
  addTransformForType,
  resetAllTransforms
} = require('../src/TransformStore')

var { Route } = require('../src/refs').ReactRouter

var CustomRoute = React.createClass({
  render () {
    return null
  }
})

var AnotherCustomRoute = React.createClass({
  render () {
    return null
  }
})

describe('createRouteFromChild', () => {
  beforeEach(() => {
    resetAllTransforms()
  })

  it('calls `createRouteFromChild`', () => {
    addTransformForType(CustomRoute, (x, i) => {
      return <Route name="CustomRoute" key={i}>
        {createRoutesFromChildren(x.props.children)}
      </Route>
    })

    addTransformForType(AnotherCustomRoute, (x, i) => {
      return <Route name="AnotherCustomRoute" key={i}>
        {createRoutesFromChildren(x.props.children)}
      </Route>
    })

    var routes = createRoutesFromChildren(<CustomRoute>
      <AnotherCustomRoute />
    </CustomRoute>)

    expect(routes[0].props.name).toBe('CustomRoute')
    expect(routes[0].props.children[0].props.name).toBe('AnotherCustomRoute')
  })

})

