const express = require('express')
const routes = express.Router()
const page = require('./controllers/page')
const recipes = require('./controllers/recipes')

routes.get('/', page.index)
routes.get('/about', page.about)
routes.get('/recipes', page.recipes)
routes.get('/recipes/:id', page.recipe)

routes.get('/admin/recipes', recipes.index)
routes.get('/admin/recipes/create', recipes.create)
routes.get('/admin/recipes/:id', recipes.show)
routes.get('/admin/recipes/:id/edit', recipes.edit)

routes.post('/admin/recipes', recipes.post)
routes.put('/admin/recipes', recipes.put)
routes.delete('/admin/recipes', recipes.delete)


module.exports = routes