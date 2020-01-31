const express = require('express'),
	db = require('../models'),
	helpers = require('../helpers/todos');

const router = express.Router();

// Index and Create Routes
router.route('/').get(helpers.getTodos).post(helpers.createTodo);

// Show, Update, and Delete Routes
router.route('/:todoId').get(helpers.getTodo).put(helpers.updateTodo).delete(helpers.deleteTodo);

module.exports = router;
