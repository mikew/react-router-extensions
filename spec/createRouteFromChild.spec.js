var createRouteFromChild = require('../src/createRouteFromChild')
var {
  addTransformForType,
  resetAllTransforms
} = require('../src/TransformStore')

var CustomRoute = React.createClass({
  render () {
    return null
  }
})

describe('createRouteFromChild', () => {
  beforeEach(() => {
    resetAllTransforms()
  })

  it('calls the provided transform', () => {
    addTransformForType(CustomRoute, (x) => 'created')
    expect(createRouteFromChild(<CustomRoute />)).toBe('created')
  })

  it('throws an error when no transform found', () => {
    var expectedError = new Error('ReactRouterExtensions could not transform `CustomRoute`')
    expect(() => createRouteFromChild(<CustomRoute />)).toThrow(expectedError)
  })
})
