const loaderUtils = require('loader-utils')
const glslify     = require('glslify')
const path        = require('path')

module.exports = glslifyWebpackLoader

function glslifyWebpackLoader(source) {
  var basedir = path.dirname(this.resourcePath)
  var opts = loaderUtils.parseQuery(this.query)
  var self = this

  opts.inline = true
  opts.basedir = basedir

  this.callback = this.async()
  this.cacheable(true)

  glslify.bundle(source, opts, function(err, src, files) {
    if (files) {
      files.forEach(function(file) {
        self.addDependency(file)
      })
    }

    return self.callback(err, src)
  })
}
