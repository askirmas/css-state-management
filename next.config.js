const jsonImporter = require('node-sass-json-importer')

module.exports = {
  "sassOptions": {
    "importer": jsonImporter()
  }
}