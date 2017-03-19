!function(a, angular) {
    "use strict";
  var b = angular.module("ng-date-range",[]);
	b.directive('ngDateRange', function() {
        // Runs during compile
        return {
             controller: function($scope, $element, $attrs, $transclude) {
        	    $scope.newFre=1;
        	    if(angular.isUndefined($scope.mindate))$scope.mindate='20150101';
        	    if(angular.isUndefined($scope.maxdate))$scope.maxdate='20500101';
        	    $scope.range=[$scope.mindate, $scope.maxdate];
        	    
    			$scope.showStart=function()
    			{
    				var input=$element.find("#weekly");
    				var startInput=input.find(".start");
    				if(startInput==undefined||startInput.datepicker('isInline'))
    				{
    					startInput.datepicker('show');
    				}
    				else
    				{
    					startInput.datepicker('hide');
    				}
    			};
    			$scope.showEnd=function()
    			{
    				var input=$element.find("input");
    				var endInput=input.find(".end");
    				if(endInput==undefined||endInput.datepicker('isInline'))
    				{
    					endInput.datepicker('show');
    				}
    				else
    				{
    					endInput.datepicker('hide');
    				}
    			};
				$scope.$on("changeRangeFre", function(a,b){
						var input=$element.find("#weekly");
						input.datepicker("remove");
						$scope.newFre=parseInt(b);
						
						var option=$scope.changOption($scope.newFre);
						$scope.datepicker(input,option,$scope.newFre);
				});
				
				$scope.datepicker=function(input,option,newFre){
					$scope.newstartdate=$scope.startdate;
					$scope.newenddate=$scope.enddate;
					
					if(newFre==5)
					{
						$scope.newstartdate=translateDate($scope.mindate, $scope.maxdate, $scope.startdate, $scope.datefre, 1);
						$scope.newenddate=translateDate($scope.mindate, $scope.maxdate, $scope.enddate, $scope.datefre, 1);
					}
					else
					{
						$scope.newstartdate=translateDate($scope.mindate, $scope.maxdate, $scope.startdate, $scope.datefre, newFre);
						$scope.newenddate=translateDate($scope.mindate, $scope.maxdate, $scope.enddate, $scope.datefre, newFre);
					}
					input.datepicker(option);
					input.find(".start").datepicker("setRange",$scope.range);
					input.find(".start").datepicker("update",$scope.newstartdate);
					input.find(".end").datepicker("setRange",$scope.range);
					input.find(".end").datepicker("update",$scope.newenddate);
					input.datepicker('updateDates');
					
//					input.find(".start").on("changeDate",function(){
//						alert(input.find(".start").datepicker('getFormatedDate'));
//					});
				};
				
				
				$scope.init=function(){
					var option=$scope.changOption(1);
					var input=$element.find("#weekly");
					input.datepicker(option);
					
					input.find(".start").datepicker("setRange",$scope.range);
					input.find(".start").datepicker("update",$scope.startdate);
					input.find(".end").datepicker("setRange",$scope.range);
					input.find(".end").datepicker("update",$scope.enddate);
					input.datepicker('updateDates');
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
							disableIfExceedRange:true,
							format: "yyyyMMdd",
							calendarWeeks: true
				    	};
						$scope.range=[$scope.mindate,$scope.maxdate];
				    	break;
					case 5: //周
						option={
							startDate: $scope.mindate,
							endDate: $scope.maxdate,
							language: 'cs',
							autoclose: true,
							disableIfExceedRange:true,
							format: "yyyyMMdd",
							weekStart: 1,//这个地方存在bug，与getWeek存在关联，待修改
							calendarWeeks: true,
							weekPicker: {
								formatWeek: function(startWeekDate, options, $datepicker) {
									return new JsSimpleDateFormat("yyyyww", 'en', true).format(startWeekDate);
								},
								getWeekStart: function(weekString, options, $datepicker) {
									var df = new JsSimpleDateFormat("yyyyww", 'en', true);
									df.isLenient = true;
									return df.parse(weekString);
								}
							}
				    	};
						$scope.range=[$scope.mindate,$scope.maxdate];
				    	break;
					case 2: //月
						option={
							startDate: $scope.mindate.substring(0, 6),
							endDate: $scope.maxdate.substring(0, 6),
							language: 'cs',
							disableIfExceedRange:true,
							autoclose: true,
							minViewMode: "months",
							format: "yyyyMM"
				    	};
						$scope.range=[$scope.mindate.substring(0, 6),$scope.maxdate.substring(0, 6)];
						break;
					case 3: //季
						option={
								startDate: $scope.mindate.substring(0, 6),
								endDate: $scope.maxdate.substring(0, 6),
								language: 'qtrs',
								autoclose: true,
								disableIfExceedRange:true,
								minViewMode: "months",
								format: "yyyyMM",
								forceParse: false
					    	};
						$scope.range=[$scope.mindate.substring(0, 6),$scope.maxdate.substring(0, 6)];
						break;
					case 4: //年
						option={
							startDate: $scope.mindate.substring(0, 4),
							endDate: $scope.maxdate.substring(0, 4),
							language: 'cs',
							autoclose: true,
							disableIfExceedRange:true,
							minViewMode: "years",
							format: "yyyy"
				    	};
						$scope.range=[$scope.mindate.substring(0, 4),$scope.maxdate.substring(0, 4)];
				    	break;
					case 6: //半年
						option={
							startDate: translateDate($scope.mindate, $scope.maxdate, $scope.mindate, $scope.datefre, 6),
							endDate: translateDate($scope.mindate, $scope.maxdate, $scope.maxdate, $scope.datefre, 6),
							language: 'hys',
							autoclose: true,
							disableIfExceedRange:true,
							minViewMode: "months",
							format: "yyyyMM"
				    	};
						$scope.range=[option.startDate,option.endDate];
				    	break;
					}
					
					return option;
				};
				
				$scope.init();
            },
            restrict: 'EA',
            replace: true,
            scope:{ /* 绑定变量 */
				mindate : '=',
				maxdate : '=',
				datefre : '=',
				startdate : '=',
				enddate : '='
			},
			template: "<div class=\"form-group\" style=\"margin-bottom: 0px;\"><div id=\"weekly\" class=\"input-group input-daterange\"><div class=\"input-group date\">开始时间<input  name=\"weekly.StartDate\" type=\"text\" class=\"query-form datepicker start\" ng-model=\"startdate\" palaceholder=\"开始时间\"><i class=\"fa fa-calendar\" ng-click=\"showStart()\" style=\"position: absolute;cursor: pointer;margin-top: 12px;margin-left: -15px;\"></i></div><div class=\"input-group date\">结束时间<input name=\"weekly.EndDate\" type=\"text\" class=\"query-form datepicker end\" ng-model=\"enddate\" palaceholder=\"结束时间\"><i class=\"fa fa-calendar\" ng-click=\"showEnd()\" style=\"position: absolute;cursor: pointer;margin-top: 12px;margin-left: -15px;\"></i></div></div></div>",
			link: function($scope, element, attr) {
				//alert(22);
			}
        };
    });
}(window, window.angular)
