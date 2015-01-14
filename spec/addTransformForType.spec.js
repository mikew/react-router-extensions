var CustomRoute = React.createClass({
  render () {
    return null
  }
})

var Noop = React.createClass({
  render () {
    return null
  }
})

var {
  addTransformForType,
  getTransformForType,
  resetAllTransforms,
} = require('../src/TransformStore')

describe('TransformStore', () => {
  beforeEach(() => {
    resetAllTransforms()
  })

  it('can addTransformForType', () => {
    var transform

    addTransformForType(CustomRoute, () => {})
    transform = getTransformForType(CustomRoute)
    expect(transform).not.toBe(undefined)
  })

  it('can getTransformForType', () => {
    var transform

    addTransformForType(CustomRoute, () => {})
    transform = getTransformForType(CustomRoute)
    expect(transform).not.toBe(undefined)

    transform = getTransformForType(Noop)
    expect(transform).toBe(undefined)
  })

  it('can resetAllTransforms', () => {
    var transform

    addTransformForType(CustomRoute, () => {})
    transform = getTransformForType(CustomRoute)
    expect(transform).not.toBe(undefined)

    resetAllTransforms()

    transform = getTransformForType(CustomRoute)
    expect(transform).toBe(undefined)
  })
})
