var __transforms = []

function getTransformForType (type) {
  if (type.type.__reactRouterExtensionsID == null) {
    return
  }

  return __transforms[type.type.__reactRouterExtensionsID]
}

function addTransformForType (type, transform) {
  type.type.__reactRouterExtensionsID = __transforms.push(transform) - 1
}

function resetAllTransforms () {
  while (__transforms.length) {
    __transforms.pop()
  }
}

module.exports = {
  getTransformForType,
  addTransformForType,
  resetAllTransforms,
}
