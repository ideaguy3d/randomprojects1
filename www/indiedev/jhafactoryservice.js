/**
 * Created by Julius Hernandez on 10/12/2015.
 * ...just to help me grasp the difference between a .service() & .factory()
 */

//ng source code of each
function jfactory(name, factoryFn) {
    return provider(name, {$get: factoryFn});
}

function jservice(name, constructor) {
    return jfactory(name, ['$injector', function ($injector) {
        return $injector.instantiate(constructor);
    }])
}
//

angular.module('ngfireApp')
    .service('helloWorldService', function () {
        //
        this.hello = function () {
            return ".service 'hello world' ^_^";
        }
    })
    .factory('helloWorldFactory', function () {
        var awesomeSecretMethod = function (somearg) {
            return "somearg = "+somearg;
        };
        return {
            hello: function () {
                return ".factory 'hello world' :)";
            },
            privateFn: function (somepar) {
                return "accessing the private function, "+awesomeSecretMethod(somepar);
            }
        }
    })
    .factory('helloFactory', function () {
        //this is what makes factories slightly more flexible than services, they can return functions
        //that can then be 'new'ed which can make them objects for creating other objects.
        return function (name) {
            //the name value will be set when the object is new'd
            this.name = name;

            this.hello = function () {
                return "_hello_"+this.name;
            };

            this.changeName = function (newname) {
                this.name = newname;
                //return this.name;
            };
        }
    })
    .controller('helloWorldController', ['$scope','helloWorldService', 'helloWorldFactory', 'helloFactory',
        function ($scope, helloWorldService, helloWorldFactory, helloFactory) {
            //hw = hello world
            var hwCtrl = this;

            $scope.hws = helloWorldService.hello();
            $scope.hwf = helloWorldFactory.hello();

            var helloObj = new helloFactory('_Julius');
            helloObj.zname = helloObj.hello();
            //console.log(helloObj.zname + " = helloObj.zname... ABOVE");
            helloObj.changeName("_Romulus");
            //console.log(helloObj.zname + " = helloObj.zname... BELOW");

            $scope.hf2 = new helloFactory('_Julius').hello();
            $scope.hf3 = new helloFactory('_Alvarado').hello();


            hwCtrl.accessPrivateFn = helloWorldFactory.privateFn("_so_cool!");
            hwCtrl.hwCombined = "hwCombined = " + $scope.hws+ " :: " + $scope.hf3;
            hwCtrl.zhelloFn = helloObj;

        }
    ])
    .controller('TodoListController', function() {
        var todoList = this;
        todoList.todos = [
            {text:'learn angular', done:true},
            {text:'build an angular app', done:false}
        ];

        todoList.addTodo = function() {
            todoList.todos.push({text:todoList.todoText, done:false});
            todoList.todoText = '';
        };

        todoList.remaining = function() {
            var count = 0;
            angular.forEach(todoList.todos, function(todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };

        todoList.archive = function() {
            var oldTodos = todoList.todos;
            todoList.todos = [];
            angular.forEach(oldTodos, function(todo) {
                if (!todo.done) todoList.todos.push(todo);
            });
        };
    });
