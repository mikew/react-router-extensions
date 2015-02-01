var Router = require('react-router')
var { Route, DefaultRoute } = Router
var { CollectionRoute, ModelRoutes } = require('../../src/included-transforms/components')
var createRoutesFromChildren = require('../../src/createRoutesFromChildren')
var transformCollectionRoute = require('../../src/included-transforms/transformCollectionRoute')

var {
  addTransformForType,
  resetAllTransforms
} = require('../../src/TransformStore')

function logProps (c) {
  var props = {...c.props} // jshint ignore:line
  delete props.children
  console.log(props)
}

describe('CollectionRoute', () => {
  beforeEach(() => {
    resetAllTransforms()
    require('../../src/setupTransformStore')()
    addTransformForType(CollectionRoute, transformCollectionRoute)
  })

  describe('Without wrapper', () => {
    it('handles index', () => {
      var route = <CollectionRoute
          name='posts'
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
          name='posts'
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
          name='posts'
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
          name='posts'
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
          name='posts'
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
          name='posts'
          handlers={{
            index: 'IndexComponent',
          }}
          >
        <ModelRoutes>
          <Route name='history' handler='HistoryComponent' />
        </ModelRoutes>
        <Route name='latest' handler='LatestComponent' />
      </CollectionRoute>

      var routes = createRoutesFromChildren(route)

      expect(routes[0].props.path).toBe('posts')
      expect(routes[0].props.name).toBe('posts/index')
      expect(routes[0].props.handler).toBe('IndexComponent')

      expect(routes[1].props.path).toBe('posts/latest')
      expect(routes[1].props.name).toBe('posts/latest')
      expect(routes[1].props.handler).toBe('LatestComponent')

      expect(routes[2].props.path).toBe('posts/:id/history')
      expect(routes[2].props.name).toBe('posts/history')
      expect(routes[2].props.handler).toBe('HistoryComponent')
    })

    it('makes sane URLs', () => {
      var routes = createRoutesFromChildren(<CollectionRoute name="posts"
          handlers={{
            //wrapper: WrapperComponent,
            index: createMockComponent('IndexComponent'),
            search: createMockComponent('SearchComponent'),
            create: createMockComponent('CreateComponent'),
            show: createMockComponent('ShowComponent'),
            edit: createMockComponent('EditComponent'),
          }}
          />)
      var router

      function createMockComponent (name) {
        return React.createClass({
          render () {
            return <span>{name}</span>
          }
        })
      }

      function expectRouteToBe (route, expected) {
        Router.run(routes, route, (Handler) => {
          var rendered = React.renderToStaticMarkup(<Handler />)
              .replace(/<\/?span>/g, '')
          expect(rendered).toBe(expected)
        })

      }

      expectRouteToBe('/posts', 'IndexComponent')
      expectRouteToBe('/posts/search', 'SearchComponent')
      expectRouteToBe('/posts/create', 'CreateComponent')
      expectRouteToBe('/posts/1234', 'ShowComponent')
      expectRouteToBe('/posts/1234/edit', 'EditComponent')
    })
  })

  describe('With wrapper', () => {
    it('handles index', () => {
      var route = <CollectionRoute
          name='posts'
          handlers={{
            wrapper: 'WrapperComponent',
            index: 'IndexComponent',
          }} />

      var routes = createRoutesFromChildren(route)
      expect(routes[0].props.path).toBe(undefined)
      expect(routes[0].props.name).toBe('posts')
      expect(routes[0].props.handler).toBe('WrapperComponent')

      expect(routes[0].props.children[0].type).toBe(DefaultRoute.type)
      expect(routes[0].props.children[0].props.handler).toBe('IndexComponent')
    })

    it('handles search', () => {
      var route = <CollectionRoute
          name='posts'
          handlers={{
            wrapper: 'WrapperComponent',
            search: 'SearchComponent',
          }}
          />

      var routes = createRoutesFromChildren(route)
      expect(routes[0].props.path).toBe(undefined)
      expect(routes[0].props.name).toBe('posts')
      expect(routes[0].props.handler).toBe('WrapperComponent')

      expect(routes[0].props.children[0].type).toBe(DefaultRoute.type)
      expect(routes[0].props.children[0].props.handler).toBe('SearchComponent')
    })

    it('handles create', () => {
      var route = <CollectionRoute
          name='posts'
          handlers={{
            wrapper: 'WrapperComponent',
            create: 'CreateComponent',
          }}
          />

      var routes = createRoutesFromChildren(route)
      expect(routes[0].props.path).toBe(undefined)
      expect(routes[0].props.name).toBe('posts')
      expect(routes[0].props.handler).toBe('WrapperComponent')

      expect(routes[0].props.children[0].props.path).toBe('create')
      expect(routes[0].props.children[0].props.name).toBe('posts/create')
      expect(routes[0].props.children[0].props.handler).toBe('CreateComponent')
    })

    it('handles show', () => {
      var route = <CollectionRoute
          name='posts'
          handlers={{
            wrapper: 'WrapperComponent',
            show: 'ShowComponent',
          }}
          />

      var routes = createRoutesFromChildren(route)
      expect(routes[0].props.path).toBe(undefined)
      expect(routes[0].props.name).toBe('posts')
      expect(routes[0].props.handler).toBe('WrapperComponent')

      expect(routes[0].props.children[0].props.path).toBe(':id')
      expect(routes[0].props.children[0].props.name).toBe('posts/show')
      expect(routes[0].props.children[0].props.handler).toBe('ShowComponent')
    })

    it('handles edit', () => {
      var route = <CollectionRoute
          name='posts'
          handlers={{
            wrapper: 'WrapperComponent',
            edit: 'EditComponent',
          }}
          />

      var routes = createRoutesFromChildren(route)
      expect(routes[0].props.path).toBe(undefined)
      expect(routes[0].props.name).toBe('posts')
      expect(routes[0].props.handler).toBe('WrapperComponent')

      expect(routes[0].props.children[0].props.path).toBe(':id/edit')
      expect(routes[0].props.children[0].props.name).toBe('posts/edit')
      expect(routes[0].props.children[0].props.handler).toBe('EditComponent')
    })

    iit('handles ModelRoutes', () => {
      var route = <CollectionRoute
          name='posts'
          handlers={{
            wrapper: 'WrapperComponent',
            index: 'IndexComponent',
          }}
          >
        <ModelRoutes>
          <Route name='history' handler='HistoryComponent' />
        </ModelRoutes>
        <Route name='latest' handler='LatestComponent' />
      </CollectionRoute>

      var routes = createRoutesFromChildren(route)

      expect(routes[0].props.path).toBe(undefined)
      expect(routes[0].props.name).toBe('posts')
      expect(routes[0].props.handler).toBe('WrapperComponent')

      expect(routes[0].props.children[0].props.path).toBe(':id/edit')
      expect(routes[0].props.children[0].props.name).toBe('posts/edit')
      expect(routes[0].props.children[0].props.handler).toBe('EditComponent')

      expect(routes[0].props.path).toBe('posts')
      expect(routes[0].props.name).toBe('posts/index')
      expect(routes[0].props.handler).toBe('IndexComponent')

      expect(routes[1].props.path).toBe('latest')
      expect(routes[1].props.name).toBe('posts/latest')
      expect(routes[1].props.handler).toBe('LatestComponent')

      expect(routes[2].props.path).toBe(':id/history')
      expect(routes[2].props.name).toBe('posts/history')
      expect(routes[2].props.handler).toBe('HistoryComponent')
    })

  })

})

