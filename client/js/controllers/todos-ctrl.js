angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;
                $scope.countCompleted = 0;
                $scope.countSnoozed = 0;
                $scope.todos = [];

                $scope.$watch('todos', function() {
                    $scope.countCompleted = 0;
                    $scope.countSnoozed = 0;
                    angular.forEach($scope.todos, function(item, index) {
                        if (item.completed) $scope.countCompleted++;
                        if (item.snoozed) $scope.countSnoozed++;
                    })
                }, true);

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};

                $scope.delete = function(todo, index) {
                    Todos
                        .delete(todo, { text: todo.text })
                        .then(function(response) {
                            if (response.data.success) {
                                $scope.todos.splice(index, 1);
                            }
                        });
                }

                $scope.toggleCompleted = function(todo, index) {
                    Todos
                        .toggleCompleted(todo)
                        .then(function(response) {
                            if (!response.data.success) {
                                todo.completed = !todo.completed;
                            }
                        })

                }

                $scope.snooze = function(todo, index) {
                    Todos
                        .snooze(todo)
                        .then(function(response) {
                            if (response.data.success) {
                                todo.snoozed = true;
                            } else {
                                todo.snoozed = false;
                            }
                        });
                }

                $scope.unsnooze = function(todo, index) {
                    Todos
                        .unsnooze(todo)
                        .then(function(response) {
                            if (response.data.success) {
                                todo.snoozed = false;
                            } else {
                                todo.snoozed = true;
                            }
                        });
                }

	}]);
