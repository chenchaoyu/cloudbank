angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.isFirstOneClicked=false;

		$scope._idA;
		$scope.valueA=new Number;

		$scope._idB;
		$scope.valueB=new Number;

		$scope.cash=new Number;
		$scope.isBalanceShow=false;
		$scope.isTransferShow=false;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		$scope.setAccount=function(id,value){
			if($scope.isFirstOneClicked==false){
				$scope._idA=id;
				$scope.valueA=value;
				$scope.isFirstOneClicked=true;
			}
			else()=>{
				$scope._idB=id;
				$scope.valueB=value;
			}
		
		};

		$scope.deposit = function(){

			            if ($scope.cash != undefined){
							$scope.cash=Number($scope.cash);
			                $scope.loading = true;
			                var balance=$scope.valueA+$scope.cash;
			                Todos.put($scope._idA,balance)
			
			                    .success(function(data){
			                        $scope.loading = false;
			                        $scope.formData={};
			                        $scope.todos = data;
			                    });
			            }
			        };
			
		//取款
		$scope.redraw = function(cash) {
			            if ($scope.formData.cash != undefined){
				            cash=Number(cash)
			                $scope.loading = true;
			                var balance=$scope.valueA-cash;
			                if(balance>=0){
			                Todos.modify($scope.nameA,balance)
			
			                    .success(function(data){
			                        $scope.loading = false;
			                        $scope.formData={};
			                        $scope.todos = data;
			                    });
			                }
			                //TODO: 取款数大于存款数的逻辑
			            }
			        };

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

		//Create accounts
		$scope.createAccount=function(){
    
		}

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};

		//showBalanceDialog
		$scope.showAddBalanceDialog=function(){
			$scope.isBalanceShow=true;
		};

		//showTransferDialog
		$scope.showTransferDialog=function(){
			$scope.isTransferShow=true;
		}
	}]);
