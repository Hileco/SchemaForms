angular.module('hsf.directives').config(function factory(hsfElementProvider) {
	hsfElementProvider.register('choice', 'hsf-type-choice');
});

angular.module('hsf.directives').directive('hsfTypeChoice', function factory($compile, hsfElementScope) {
	return {
		// we need a wrapper <div> tag to prevent .form-group inside .form-group messing up the style
		template:	'<div>'
				+		'<div class="form-group">'
				+			'<label class="col-lg-3 control-label">{{ schema.title || schema.name }}</label>'
				+			'<div class="col-lg-9">'
				+				'<select class="form-control" id="{{ context.path }}">'
				+					'<option value=""></option>'
				+					'<option data-ng-repeat="choice in schema.choices" value="{{ choice.name }}">{{ choice.title || choice.name }}</option>'
				+				'</select>'
				+			'</div>'
				+		'</div>'
				+		'<span></span>'
				+	'</div>',
        scope: hsfElementScope,
		link: function postLink($scope, $element){
			var select = $element.find('select');
			select.bind('change', function(event){
				// delete all choices
				for(var i in $scope.schema.choices){
					var choice_name = $scope.schema.choices[i].name;
					delete $scope.model[choice_name];
				}
				// set up current choice
				// TODO: test whether this is cross browser compatible
				$scope.chosen = select[0].selectedIndex - 1;
				// TODO: this may need an alternative
				var container = $element.find('span');
				container.children().remove();
				if($scope.chosen >= 0){
					var chosen_el = $compile('<div hsf-element schema="schema.choices[chosen]" model="model" context="context"/>')($scope);
					container.append(chosen_el);
				}
				$scope.$apply();
			});
		}
	};
});
