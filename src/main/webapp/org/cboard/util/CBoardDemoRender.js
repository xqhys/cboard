var CBoardDemoRender = function (jqContainer, options) {
    this.container = jqContainer; // jquery object
    this.options = options;
};

CBoardDemoRender.prototype.html = function (persist) {
    var self = this;
    var temp = "" + self.template;
    var html = temp.render(self.options);
    if (persist) {
        setTimeout(function () {
            self.container.css('background', '#fff');
            html2canvas(self.container, {
                onrendered: function (canvas) {
                    persist.data = canvas.toDataURL("image/jpeg");
                    persist.type = "jpg";
                    persist.widgetType = "demo";
                }
            });
        }, 1000);
        // persist.data = {name: self.options.kpiName, value: self.options.kpiValue};
        // persist.type = "kpi";
    }
    return html;
};

CBoardDemoRender.prototype.realTimeTicket = function () {
    var self = this;
    return function (o) {
        $(self.container).find('h3').html(o.demoName);
    }
};

CBoardDemoRender.prototype.do = function () {
    var self = this;
    $(self.container).html(self.rendered());
};

CBoardDemoRender.prototype.template =
    "<div class='small-box {style}'> \
               <div class='inner'> \
                  <h3>{demoValue}</h3> \
                  <p>{demoName}</p> \
               </div> \
               <div class='icon'> \
                   <i class='ion ion-stats-bars'></i> \
               </div> \
               <a class='small-box-footer'>\
                   <span name='reload_{{widget.widget.id}}' ng-click='reload(widget)' style='cursor: pointer'>{refresh} <i class='fa fa-refresh'></i></span>\
                   <span ng-click='config(widget)' ng-if='widgetCfg' style='cursor: pointer'>{edit} <i class='fa fa-wrench'></i></span>\
               </a>\
            </div>";
