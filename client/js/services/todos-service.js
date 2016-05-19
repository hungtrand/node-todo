angular.module('todoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},

                        delete: function(todo, data) {
                            return $http({
                                url: '/api/todos/' + todo['_id'],
                                method: 'DELETE',
                                data: data
                            });
                        },
                        markCompleted: function(todo) {
                            return $http({
                                url: '/api/todos/' + todo['_id'],
                                method: 'POST',
                                data: { completed: true }
                            });
                        }

		}
	}]);
