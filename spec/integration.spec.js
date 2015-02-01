//var Router = require('react-router')
//var { Route, State, Navigation, Link, RouteHandler } = Router
////var TestLocation = require('react-router/modules/locations/TestLocation')

//var { CollectionRoute, ModelRoutes } = require('../src/included-transforms/components')
//var createRoutesFromChildren = require('../src/createRoutesFromChildren')
//var transformCollectionRoute = require('../src/included-transforms/transformCollectionRoute')

//var {
  //addTransformForType,
  //resetAllTransforms
//} = require('../src/TransformStore')


//var WrapperComponent = React.createClass({
  //render () {
    //return <span>
      //WrapperComponent <RouteHandler />
    //</span>
  //}
//})

//var IndexComponent = React.createClass({
  //render () {
    //return <span>IndexComponent</span>
  //}
//})

//var SearchComponent = React.createClass({
  //render () {
    //return <span>SearchComponent</span>
  //}
//})

//var CreateComponent = React.createClass({
  //render () {
    //return <span>CreateComponent</span>
  //}
//})

//var ShowComponent = React.createClass({
  //render () {
    //return <span>ShowComponent</span>
  //}
//})

//var EditComponent = React.createClass({
  //render () {
    //return <span>EditComponent</span>
  //}
//})

//describe('Integration', () => {
  //beforeEach(() => {
    //resetAllTransforms()
    //require('../src/setupTransformStore')()
    //addTransformForType(CollectionRoute, transformCollectionRoute)
  //})

  //iit('works', () => {
    //var routes = createRoutesFromChildren(<CollectionRoute name="posts"
        //handlers={{
          ////wrapper: WrapperComponent,
          //index: IndexComponent,
          //search: SearchComponent,
          //create: CreateComponent,
          //show: ShowComponent,
          //edit: EditComponent,
        //}}
        ///>)
    //var router

    //function expectRouteToBe (route, expected) {
      //Router.run(routes, route, (Handler) => {
        //var rendered = React.renderToStaticMarkup(<Handler />)
            //.replace(/<\/?span>/g, '')
        //expect(rendered).toBe(expected)
      //})

    //}

    //expectRouteToBe('/posts', 'IndexComponent')
    //expectRouteToBe('/posts/search', 'SearchComponent')
    //expectRouteToBe('/posts/create', 'CreateComponent')
    //expectRouteToBe('/posts/1234', 'ShowComponent')
    //expectRouteToBe('/posts/1234/edit', 'EditComponent')
  //})
//})
