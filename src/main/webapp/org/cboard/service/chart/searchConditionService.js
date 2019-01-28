/**
 * Created by yfyuan on 2019/1/26.
 */
'use strict';
cBoard.service("searchConditionService", function($compile){

    // 检索条件
    this.search = function(scope, containerDom){
        var searchCondition = "<div class='searchCondition' ng-include=\"'org/cboard/view/config/chart/template/searches.html'\" style='border: 0px solid red;width: 500px;min-height: 65px;margin-left: auto;margin-right: 25px;position:relative;z-index:9999;'>" +
            // "<table style='margin-left: auto;'>" +
            // "<tr>" +
            // "<td><input type='radio' name='radio_flag' key='goodsClass' value='男士毛衣' ng-click='searchCondition()'>男士毛衣</td>" +
            // "<td>&nbsp;&nbsp;<input type='radio' name='radio_flag' key='goodsClass' value='男士衣裤' ng-click='searchCondition()'>男士衣裤</td>" +
            // "</tr>" +
            // "</table>" +
            "</div>";

        if(!containerDom.find(".searchCondition").hasClass("searchCondition")){
            var $searchCondition = $compile(searchCondition)(scope);
            containerDom.find("div").first().css("top", "-65px")
            containerDom.find("div").first().before($searchCondition);
        }
    }

});