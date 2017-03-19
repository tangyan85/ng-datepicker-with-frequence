!function(a, angular) {
    "use strict";
 var b = angular.module("ng-date",[]);
b.directive('ngDate', function() {
        // Runs during compile
        return {
             controller: function($scope, $element, $attrs, $transclude) {
        	    $scope.newDate=$scope.datadate;
        	    $scope.newFre=1;
        	    if(angular.isUndefined($scope.mindate))$scope.mindate='20150101';
        	    if(angular.isUndefined($scope.maxdate))$scope.maxdate='20500101';
        	    
    			$scope.show=function()
    			{
    				var input=$element.find("#daily");
    				if(input==undefined||input.datepicker('isInline'))
    				{
    					input.datepicker('show');
    				}
    				else
    				{
    					input.datepicker('hide');
    				}
    			};
        	    
				$scope.$on("changeFre", function(a,b){
						var input=$element.find("#daily");
						input.datepicker("remove");
						$scope.newFre=parseInt(b);
						
						var option=$scope.changOption($scope.newFre);
						$scope.datepicker(input,option,$scope.newFre);
				});
				
				$scope.datepicker=function(input,option,newFre){
					if(newFre==5)
						$scope.datadate=translateDate($scope.mindate, $scope.maxdate, $scope.datadate, $scope.datefre, 1);
					else
						$scope.datadate=translateDate($scope.mindate, $scope.maxdate, $scope.datadate, $scope.datefre, newFre);
					input.datepicker(option);
					input.datepicker("update",$scope.datadate);
					input.datepicker("updateDates");
				};
				
				
				$scope.init=function(){
					var option=$scope.changOption(1);
					var input=$element.find("#daily");
					input.datepicker(option);
					input.datepicker("update",$scope.datadate);
				};
				
				$scope.changOption=function(newFre)
				{
					var option={};
					switch(newFre){
					case 1: //日
						option={
							autoclose: true,
							startDate: $scope.mindate,
							endDate: $scope.maxdate,
							language: 'cs',
							weekStart: 1,
							calendarWeeks: true,
							format: "yyyyMMdd"
				    	};
				    	break;
					case 5: //周
						option={
							startDate: $scope.mindate,
							endDate: $scope.maxdate,
							language: 'cs',
							autoclose: true,
							format: "yyyyMMdd",
							weekStart: 1,//这个地方存在bug，与getWeek存在关联，待修改
							calendarWeeks: true,
							weekPicker: {
								formatWeek: function(startWeekDate, options, $datepicker) {
							        var dd=new JsSimpleDateFormat("yyyyww", 'en', true).format(startWeekDate);
							        //console.log("dd:"+dd);
									return dd;
								},
								getWeekStart: function(weekString, options, $datepicker) {
									var df = new JsSimpleDateFormat("yyyyww", 'en', true);
									df.isLenient = true;
									var dfs=df.parse(weekString);
									//console.log("dfs:"+dfs);
									return dfs;
								}
							}
				    	};
				    	break;
					case 2: //月
						option={
							startDate: $scope.mindate.substring(0, 6),
							endDate: $scope.maxdate.substring(0, 6),
							language: 'cs',
							autoclose: true,
							minViewMode: "months",
							format: "yyyyMM"
				    	};
						break;
					case 3: //季
						option={
								startDate: $scope.mindate.substring(0, 6),
								endDate: $scope.maxdate.substring(0, 6),
								language: 'qtrs',
								autoclose: true,
								minViewMode: "months",
								format: "yyyyMM",
								forceParse: false
					    	};
						break;
					case 4: //年
						option={
							startDate: $scope.mindate.substring(0, 4),
							endDate: $scope.maxdate.substring(0, 4),
							language: 'cs',
							autoclose: true,
							minViewMode: "years",
							format: "yyyy"
				    	};
				    	break;
					case 6: //半年
						option={
							startDate: translateDate($scope.mindate, $scope.maxdate, $scope.mindate, $scope.datefre, 6),
							endDate: translateDate($scope.mindate, $scope.maxdate, $scope.maxdate, $scope.datefre, 6),
							language: 'hys',
							autoclose: true,
							minViewMode: "months",
							format: "yyyyMM"
				    	};
				    	break;
					}
					return option;
				};
				
				$scope.init();
            },
            restrict: 'EA',
            replace: true,
            scope:{ /* 绑定变量 */
				datadate : '=',
				mindate : '=',
				maxdate : '=',
				datefre : '='
			},
			template: " <div class=\"form-group\" style=\"margin-bottom: 0px;\"><div class=\"input-group date\">时间：<input id=\"daily\" type=\"text\" class=\"query-form\" ng-model=\"datadate\" palaceholder=\"时间\"><i class=\"fa fa-calendar\" ng-click=\"show()\" style=\"position: absolute;cursor: pointer;margin-top: 12px;margin-left: -15px;\"></i></div></div>",
			link: function($scope, element, attr) {
				//alert(11);
			}
        };
    });
}(window, window.angular)
h