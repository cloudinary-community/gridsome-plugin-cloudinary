// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.onCreateNode((parentNode, { _store }) => {
    if (parentNode.internal.typeName !== 'Doc') return parentNode

    if (parentNode.internal.typeName === 'Doc' && !parentNode.category) return parentNode
    
    const collection = _store.addCollection('Menu')

    let node = collection.findNode({
      title: parentNode.category
    })

    if (!node) {
      node = collection.addNode({
        title: parentNode.category,
        position: parentNode.categoryPosition,
      })
    } else if (node.position === undefined) {
      node.position = parentNode.categoryPosition || 0
      collection.updateNode(node)
    }

    return {
      ...parentNode,
      category: _store.createReference(node)
    }
  })

  api.loadSource(async store => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api

    // const collection = store.getCollection('Menu')

    // const node = collection.addNode({
    //   title: 'Demos',

    // })
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api
  })
}
