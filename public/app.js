$(document).ready(function() {
	$.getJSON('/api/todos').then(addTodos);

	$('#todoInput').keypress((event) => {
		if (event.which == 13) {
			createTodo();
		}
	});

	$('.list').on('click', 'li', function() {
		updateTodo($(this));
	});

	$('.list').on('click', 'span', function(e) {
		e.stopPropagation();
		removeTodo($(this).parent());
	});
});

function addTodos(todos) {
	// add todos to the page
	todos.forEach((todo) => {
		addTodo(todo);
	});
}

function addTodo(todo) {
	const newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
	newTodo.data('id', todo._id);
	newTodo.data('completed', todo.completed);
	if (todo.completed) {
		newTodo.addClass('done');
	}
	$('.list').append(newTodo);
}

function createTodo() {
	// send request to create new todo
	const usrInput = $('#todoInput').val();
	$.post('/api/todos', { name: usrInput })
		.then((newTodo) => {
			addTodo(newTodo);
			$('#todoInput').val('');
		})
		.catch((err) => {
			console.log(err);
		});
}

function removeTodo(todo) {
	const deleteUrl = '/api/todos/' + todo.data('id');
	$.ajax({
		method: 'DELETE',
		url: deleteUrl
	})
		.then(() => {
			todo.remove();
		})
		.catch((err) => {
			console.log(err);
		});
}

function updateTodo(todo) {
	const updateUrl = '/api/todos/' + todo.data('id');
	const isDone = !todo.data('completed');
	const updateData = { completed: isDone };
	$.ajax({
		method: 'PUT',
		url: updateUrl,
		data: updateData
	}).then(() => {
		todo.toggleClass('done');
		todo.data('completed', isDone);
	});
}
