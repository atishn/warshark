/**
	@author: 	Cho 'papi san' Snyder csnyder@hugeinc.com
	@overview: 	Warfish mapmaker. ui that generates an object the backend 
				will consume to determine "right" or "wrong" moves based on its configuration

				You can make new nodes, connect them (ie be able to attack and defend), 
				and assign generated node regions

	@requires   jquery, plump.js, angular.js, collidesWith.js, angular-resource.js, jscolor.js 
**/

/**
	TODO: 	add nodes.name to $scope.nodes
			at least pull out all tooltip ui states into a directive
			pull out all style/dom manipulation into directives if possible
**/

// Instantiating the app "Mapmaker"
var Mapmaker = angular.module('Mapmaker', ['ngResource']);

// Global vars, shared between directives and controllers
Mapmaker.factory('MapmakerService', [function(){
  	return { 
  		activeRegionID : 0,
  		activeRegionName : 'Rob Opolis',
  		regionAddable: true,
  		activeRegionBonus : 3,
  		nodeEditing : 0
  	};
}]);

// Validation
Mapmaker.directive('inputRequired', function(MapmakerService) {
	return {
		restrict: 'A', // This is a thing... good thing the documentation is horrible.
		link: function(scope, elm, attrs) {
			var $addRegionButton = $('#add-region');

			$addRegionButton.bind('click', function() {
				validate();
			});

			elm.bind('click, keyup', function() {
				validate();
			});

			function validate() {
				MapmakerService.regionAddable = true;
				elm.each(function() {
					var $this = $(this);
					if ($this.val() === '') {
						$this.parent().addClass('required');
						MapmakerService.regionAddable = false;
					} else {
						$this.parent().removeClass('required');
					}
				});
			}
		}
	}
});

// Region interactions
Mapmaker.directive('regionEditable', function(MapmakerService) {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
			var firstDirective = true;

			function init() {
				setTimeout(makeFirstRegionActiveOnload, 200);
			}

			elm.bind('click', function() {
				$('.region').removeClass('selected');
				elm.parent().addClass('selected');

				MapmakerService.activeRegionID = elm.parent().index();
				MapmakerService.activeRegionName = elm.parent().find('.region-name').text();
				MapmakerService.activeRegionBonus = elm.parent().find('.region-bonus').text();

			});

			function makeFirstRegionActiveOnload() {
				
				if ($('.region').length === 1) {
					$('.region:first').addClass('selected');
					loaded = true;
				}
			}
			
			init();
		
	    }
    };
});

// Tooltip interactions
Mapmaker.directive('toolTip', function() {
	return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
        	elm.bind('mouseenter', function() {
        		elm.find('.tool-tip').removeClass('visualy-hidden');
        	});

        	elm.bind('mouseleave', function() {
        		elm.find('.tool-tip').addClass('visualy-hidden');
        	});
        }
    }
});

// Info accordians
Mapmaker.directive('accordian', function() {
	return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
        	elm.bind('click', function() {
        		elm.next('.info-hidden').toggleClass('info-show');
        	});
        }
    }
});

// Making nodes editable via the assign regions checkbox
Mapmaker.directive('nodeEditable', function(MapmakerService) {
	return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
        	
        	elm.bind('click', function() {
        		var editable = $('#assign-regions').prop('checked');
        		if (editable) {
        			MapmakerService.nodeEditing = elm.attr('id').replace('node','');
        			setTimeout(function() {
        				$(document).trigger('nodeEdited');
        			}, 300);
        		}
        	});
        }
    }
});


// Mapmaker controller
Mapmaker.controller('MapmakerCtrl', function(MapmakerService, $scope, $resource) {

	$scope.nodes = [];
	$scope.regions = [];

	$scope.activeRegionID = 0;
	$scope.activeRegionName = MapmakerService.activeRegionName;
	$scope.activeRegionBonus = MapmakerService.activeRegionBonus;

	var $nodeEndpoints = [],
		nodeTimeout = 0,
		addingRegion = false;

	// plumb.js configuration
	var connectorPaintStyle = {
			lineWidth: 3,
			strokeStyle: "#5bb75b",
			connector:"StateMachine",
			anchor:"Continuous",
			overlays:[ ["PlainArrow", {location:1, width:20, length:12} ]]
		},
		connectorHoverStyle = {
			strokeStyle: "lime",
		},
		endpointOptions = {
			overlays:[ ["PlainArrow", {location:1, width:20, length:12} ]],
			paintStyle: { 
				fillStyle: "#5bb75b",
				radius: 4 
			},
			isSource: true,
			isTarget: true,
			connector: ["Bezier", { curviness:63 } ],
			connectorStyle: connectorPaintStyle,
			hoverPaintStyle: connectorHoverStyle,
			connectorHoverStyle: connectorHoverStyle,
	        dragOptions: {}
		}

	// plumb.js endpoint position configuration
	var anchorSettings = [
		'TopRight',
		'TopCenter',
		'TopLeft',
		'LeftMiddle',
		'BottomLeft',
		'BottomCenter',
		'BottomRight',
		'RightMiddle'
	]

	$scope.init = function() {
		var file = new WARSHARK.file();
		// If timeout isn't here ng-click doesn't work on file input
		setTimeout(file.bindInputs, 0);
		
		$scope.listenForEditedNode();
		$scope.bindConnectors();
		$scope.addRegion();
		$scope.upDateRegionColor();

		jsPlumb.importDefaults({
			DragOptions : { cursor: "pointer", zIndex: 2000 },
			HoverClass:"connector-hover",
			Container: $('#map'),
		    ConnectorZIndex: 5
		});

		jsPlumb.draggable(jsPlumb.getSelector(".node"));
	}

	$scope.save = function () {
		console.log('clicked save');
	}


	$scope.addRegion = function() {

		// if not adding a region (color picker takes a sec to bind), and the new region input vals pass validation...
		if (!addingRegion && MapmakerService.regionAddable) {
			addingRegion = true;

			// add a region object
			$scope.regions.push({
				'id': $scope.regions.length,
				'color' : 'fff',
				'name' : $scope.activeRegionName,
				'bonus' : $scope.activeRegionBonus
			});

			// add a color picker per region
			setTimeout(
				function() {
					var myPicker = new jscolor.color(document.getElementById('jscolorPicker' + ($scope.regions.length - 1)), 
											{ 
												valueElement:'jscolor' + ($scope.regions.length - 1),
												onImmediateChange: '$(document).trigger(\'changedRegionColor\')'
											}
										);
					addingRegion = false;
				}

			, 300)
		}
		
	}

	// There has to be a better way to do this, my angular game has a noticeable degree of shame.
	$scope.upDateRegionColor = function() {
		$(document).bind('changedRegionColor', function() { 
			for (var i=0; i<$scope.regions.length; i++) {
				$scope.regions[i].color = $('#jscolor' + i).val();
			}

			// TODO: fires 4 times.. 
			// alert(MapmakerService.activeRegionID);
			
			$scope.$digest();
			$scope.upDateNodeColor();

			//console.log($scope.regions);
		});
	}

	$scope.upDateNodeColor = function() {
		for (var i=0; i<$scope.nodes.length; i++) {
			var nodeRegion = $scope.nodes[i].region;
			var nodeColor = $scope.regions[nodeRegion].color;

			// this is really bad according to the google
			document.getElementById('node' + i).style.backgroundColor = '#' + nodeColor;
		}
	}

	$scope.updateRegionName = function() {
		$scope.regions[MapmakerService.activeRegionID].name = $scope.activeRegionName;
		MapmakerService.activeRegionName = $scope.activeRegionName;

		// TODO: not so DRY
		for (var i=0; i<$scope.nodes.length; i++) {
			if ($scope.nodes[i].region === MapmakerService.activeRegionID ) {
				var id = $scope.nodes[i].id;
				$scope.nodes[i].regionName = $scope.activeRegionName;
				// this is bad, make into a directive
				$scope.showTooltip(id); 
			}
		}
		
	}

	$scope.updateRegionBonus = function() {
		$scope.regions[MapmakerService.activeRegionID].bonus = $scope.activeRegionBonus;
		MapmakerService.activeRegionBonus = $scope.activeRegionBonus;

		// TODO: not so DRY
		for (var i=0; i<$scope.nodes.length; i++) {
			if ($scope.nodes[i].region === MapmakerService.activeRegionID ) {
				var id = $scope.nodes[i].id;
				// this is bad, make into a directive
				$scope.showTooltip(id); 
				$scope.nodes[i].regionBonus = $scope.activeRegionBonus;
			}
		}
	}

	$scope.updateRegionFieldName = function() {
		$scope.activeRegionName = MapmakerService.activeRegionName;
	}

	$scope.updateRegionFieldBonus = function() {
		$scope.activeRegionBonus = MapmakerService.activeRegionBonus;
		
		// Angular isn't up to snuff with ng-model 'ing on input type="number"
		setTimeout(function() {
			$('.active-region-bonus').val($scope.activeRegionBonus);
		}, 100);
		
	}

	// TODO: bad, make it a directive
	$scope.showTooltip = function(id) {
		$('#node' + parseInt(id) + ' .tool-tip').removeClass('visualy-hidden');

		setTimeout(function() {
			$('#node' + parseInt(id) + ' .tool-tip').addClass('visualy-hidden');
		}, 3000);
	}

	// when you check assign nodes this this listens for the directive trigger (Mapmaker.directive('nodeEditable')
	$scope.listenForEditedNode = function() {
		$(document).bind('nodeEdited', function() {
			
			for (var i=0; i<$scope.nodes.length; i++) {

				if ($scope.nodes[i].id === parseInt(MapmakerService.nodeEditing)) {
					
					$scope.nodes[i].region = MapmakerService.activeRegionID;
					$scope.nodes[i].regionName = MapmakerService.activeRegionName;
					$scope.nodes[i].regionBonus = MapmakerService.activeRegionBonus;

					$scope.upDateNodeColor();
					$scope.$digest(); // should prolly read more about this
				}
			}
		});
	}

	// Callback handler for connecting stuff with js plumb
	$scope.bindConnectors = function() {
		jsPlumb.bind('jsPlumbConnection', function(info) {
			$scope.populateNeighberArray(info);
		});
	}

	// adds to neighbor array, ie if I connect node 1 to 2, the neighbor array for 1 will be 2, and 2's will be 1
	$scope.populateNeighberArray = function(info) {
		var sourceID = info.source.selector.replace('#node', '');
		var targetID = info.target.selector.replace('#node', '');

		// 	TODO: using index instead of node id, in the future if delete is possible, we
		//	need to either reset id's (with lodash), or loop through to see which one has id of source, to set its neighbor
		$scope.nodes[sourceID].neighbors.push(targetID);
		$scope.nodes[targetID].neighbors.push(sourceID);

		//console.log('SOURCE:', sourceID, ', TARGET:', targetID);
	}

	// the most important object of all ($scope.nodes), this object is what I will send to the backend
	$scope.addNode = function() {
		$scope.nodes.push({
			'id': $scope.nodes.length,
			'positionX' : 0,
			'positionY' : 0,
			'region' : MapmakerService.activeRegionID,
			'regionName' : $scope.activeRegionName,
			'regionBonus' : $scope.activeRegionBonus,
			'neighbors' : []
		});

		// TODO: changing dom again
		setTimeout(function() {
			$('.tool-tip').addClass('visualy-hidden');
		}, 2000);
		
		setTimeout(
			function() {
				jsPlumb.draggable(jsPlumb.getSelector(".node"));
				$scope.upDateNodeColor();
			}
		, 300)
		
	}

	$scope.showPlumbPoints = function(nodeID) {

		clearTimeout(nodeTimeout);

		$nodeEndpoints = $('#node' + nodeID).collidesWith('div._jsPlumb_endpoint');

		$nodeEndpoints.each(function(){
			$(this).addClass('show');
		});

	}

	$scope.hidePlumbPoints = function() {

		nodeTimeout = setTimeout(
			function () {
				$nodeEndpoints.each(function() {
					$(this).removeClass('show');
				});
			}, 800);
		
	}
	
	$scope.wirePlumbPoints = function(nodeID) {
		var thisNode = 'node' + nodeID,
			$thisNode = $('#' + thisNode);

		if (!$thisNode.hasClass('plumbed')) {
			for (var i=0; i<anchorSettings.length; i++) {
				jsPlumb.addEndpoint(thisNode, { anchor:anchorSettings[i] }, endpointOptions );
			}
		}

		$thisNode.addClass('plumbed');
		
	}

	$scope.upDatePosition = function(nodeID) {
		var thisNode = 'node' + nodeID;

		var left = document.getElementById(thisNode).style.left;
		var top = document.getElementById(thisNode).style.top;

		$scope.nodes[nodeID].positionX = left;
		$scope.nodes[nodeID].positionY = top;

		console.log('NODES', $scope.nodes);
	}

	$scope.init();

});
