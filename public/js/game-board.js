/***
**	WARSHARK NOM	
**	js for game board population and interaction
**	template, DOES NOT WORK
 */

angular.module('GameBoard', ['ngResource']);

function GameBoardCtrl($scope, $resource) {
	$scope.gameResource = $resource('https://api.soundcloud.com/:action', 
		{action:'tracks.json', client_id:'51dee6a4f08cf517a3b43b4641067b0a', q: 'starkey', callback: 'JSON_CALLBACK'},
		{get:{
			method:'JSONP',
			isArray: true
		}});

	$scope.getGameObject = function() {
		$scope.gameObject = $scope.gameResource.get({
			q:$scope.searchTerm
		});
	}
	
}