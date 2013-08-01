angular.module('hsf.directives').config(function factory(hsfElementProvider) {
	hsfElementProvider.register('array', 'hsf-type-array');
});

angular.module('hsf.directives').directive('hsfTypeArray', function factory($compile) {
	return {
		template:	'<fieldset>'
				+		'<legend>'
				+		'<button class="btn" ng-click="add_element()" ng-disabled="model.length == max">Add</button> '
				+		'<button class="btn" ng-click="remove_element()" ng-disabled="model.length == min">Remove</button> '
				+		'{{ schema.title }} '
				+		'</legend>'
				+	'</fieldset>',
        scope: {
			schema: '=',
			model: '='
		},
		controller: function($scope, $element){

			$scope.min = $scope.schema.min || 0;
			$scope.max = $scope.schema.max || Infinity;
			$scope.model = [];

			$scope.add_element = function(){
				if($scope.model.length < $scope.max){
					// here we compile the template, with a static reference to the model element
					var template = '<div hsf-element model="model[' + $scope.model.length + ']" schema="schema.fields"/>';
					var compiled = $compile(template)($scope);
					$element.append(compiled);
					$scope.model.length++;
				}
			};

			$scope.remove_element = function(){
				if($scope.model.length > $scope.min){
					var children = $element.children();
					children[children.length - 1].remove();
					$scope.model.length--;
				}
			};

			while($scope.model.length < $scope.min){
				$scope.add_element();
			}

		}
	};
});
