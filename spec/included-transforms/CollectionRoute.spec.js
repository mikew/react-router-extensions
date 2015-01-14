var { CollectionRoute, ModelRoutes } = require('../../src/included-transforms/components')
var createRoutesFromChildren = require('../../src/createRoutesFromChildren')

var {
  addTransformForType,
  resetAllTransforms
} = require('../../src/TransformStore')

var { Route } = require('../../src/refs').ReactRouter

function transformCollectionRoute (child, index) {
  var ret = []
  var baseIndex = index
  var handlers = child.props.handlers

  if (handlers.wrapper) {
  } else {
    var children = []
    var modelRoutes
    var modelRoutesIndex

    React.Children.forEach(child.props.children, (c, i) => {
      if (c.type === ModelRoutes.type) {
        modelRoutesIndex = i
      }
      children.push(c)
    })

    if (modelRoutesIndex != null) {
      modelRoutes = children.splice(modelRoutesIndex, 1)[0]
      React.Children.forEach(modelRoutes.props.children, (c, i) => {
        children.push(c)
      })
    }

    if (handlers.index) {
      ret.push(<Route
          name={child.props.name + '/index'}
          path={child.props.name}
          handler={handlers.index}
          />)
    }

    if (handlers.search) {
      ret.push(<Route
          name={child.props.name + '/search'}
          path={child.props.name + '/search'}
          handler={handlers.search}
          />)
    }

    if (handlers.create) {
      ret.push(<Route
          name={child.props.name + '/create'}
          path={child.props.name + '/create'}
          handler={handlers.create}
          />)
    }

    if (handlers.show) {
      ret.push(<Route
          name={child.props.name + '/show'}
          path={child.props.name + '/:' + child.props.idParamName}
          handler={handlers.show}
          />)
    }

    if (handlers.edit) {
      ret.push(<Route
          name={child.props.name + '/edit'}
          path={child.props.name + '/:' + child.props.idParamName + '/edit'}
          handler={handlers.edit}
          />)
    }

    //ret = ret.concat(createRoutesFromChildren(child.props.children))
    ret = ret.concat(createRoutesFromChildren(children))
    //console.log(children[0])
  }

  return ret
}

describe('CollectionRoute', () => {
  beforeEach(() => {
    resetAllTransforms()
    require('../../src/setupTransformStore')()
    addTransformForType(CollectionRoute, transformCollectionRoute)
  })

  describe('Without .wrapper', () => {
    it('handles index', () => {
      var route = <CollectionRoute
          name="posts"
          handlers={{
            index: 'IndexComponent',
          }}
          />

      var routes = createRoutesFromChildren(route)
      expect(routes[0].props.path).toBe('posts')
      expect(routes[0].props.name).toBe('posts/index')
      expect(routes[0].props.handler).toBe('IndexComponent')
    })

    it('handles search', () => {
      var route = <CollectionRoute
          name="posts"
          handlers={{
            search: 'SearchComponent',
          }}
          />

      var routes = createRoutesFromChildren(route)
      expect(routes[0].props.path).toBe('posts/search')
      expect(routes[0].props.name).toBe('posts/search')
      expect(routes[0].props.handler).toBe('SearchComponent')
    })

    it('handles create', () => {
      var route = <CollectionRoute
          name="posts"
          handlers={{
            create: 'CreateComponent',
          }}
          />

      var routes = createRoutesFromChildren(route)
      expect(routes[0].props.path).toBe('posts/create')
      expect(routes[0].props.name).toBe('posts/create')
      expect(routes[0].props.handler).toBe('CreateComponent')
    })

    it('handles show', () => {
      var route = <CollectionRoute
          name="posts"
          handlers={{
            show: 'ShowComponent',
          }}
          />

      var routes = createRoutesFromChildren(route)
      expect(routes[0].props.path).toBe('posts/:id')
      expect(routes[0].props.name).toBe('posts/show')
      expect(routes[0].props.handler).toBe('ShowComponent')
    })

    it('handles edit', () => {
      var route = <CollectionRoute
          name="posts"
          handlers={{
            edit: 'EditComponent',
          }}
          />

      var routes = createRoutesFromChildren(route)
      expect(routes[0].props.path).toBe('posts/:id/edit')
      expect(routes[0].props.name).toBe('posts/edit')
      expect(routes[0].props.handler).toBe('EditComponent')
    })

    it('handles ModelRoutes', () => {
      var route = <CollectionRoute
          name="posts"
          handlers={{
            index: 'IndexComponent',
          }}
          >
        <ModelRoutes>
          <Route name="history" handler="HistoryComponent" />
        </ModelRoutes>
      </CollectionRoute>

      var routes = createRoutesFromChildren(route)

      expect(routes[0].props.path).toBe('posts')
      expect(routes[0].props.name).toBe('posts/index')
      expect(routes[0].props.handler).toBe('IndexComponent')

      //expect(routes[0].props.children[0].props.path).toBe('posts')
      //expect(routes[0].props.children[0].props.name).toBe('posts/index')
      //expect(routes[0].props.children[0].props.handler).toBe('IndexComponent')

      //console.log(routes)
    })

  })

})
