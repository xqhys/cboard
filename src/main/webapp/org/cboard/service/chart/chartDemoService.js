/**
 * Created by yfyuan on 2016/10/28.
 */
'use strict';
cBoard.service('chartDemoService', function (dataService, $compile, $filter) {

    var translate = $filter('translate');

    this.render = function (containerDom, option, scope, persist) {
        var render = new CBoardDemoRender(containerDom, option);
        var html = render.html(persist);
        if (scope) {
            containerDom.append($compile(html)(scope));
        } else {
            containerDom.html(html);
        }
        return render.realTimeTicket();
    };

    this.parseOption = function (data) {
        var option = {};
        var config = data.chartConfig;
        var casted_keys = data.keys;
        var casted_values = data.series;
        var aggregate_data = data.data;
        var newValuesConfig = data.seriesConfig;

        option.demoValue = aggregate_data.length > 0 ? aggregate_data[0][0] : 'N/A';
        if (config.values[0].format) {
            option.demoValue = numbro(option.demoValue).format(config.values[0].format);
        }
        option.demoName = config.values[0].name;
        option.style = config.values[0].style;
        option.edit = translate("COMMON.EDIT");
        option.refresh = translate("COMMON.REFRESH");
        return option;
    };
});