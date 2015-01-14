global.React = require('react')

require('node-jsx').install({
  harmony: true,
})

require('../src').setup({
  ReactRouter: require('react-router')
})
