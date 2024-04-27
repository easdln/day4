import { Form } from 'ecosoft-lexema8'; // импорт компонентов из библиотеки ecosoft-lexema8
import template from './ChartForm.xml'; // импорт макета документа
import ko from 'knockout';

export default class ChartForm extends Form {
    constructor(...args) {
    super(...args);
        this.controls.Grid1.dataSource = ko.mapping.fromJS(this.dataGrid);
        this.controls.Grid1.addGrouping('MaterialGroup', 0);
        this.setChartSettings();
    }
    // макет документа
    static get template() {
        return template;
    }

    toolBarItemExit_clicked() {
        this.close();
    }

    get dataGrid() {
        return [
            {Price: 60.88, Material: 'Яблоки', MaterialGroup: 'Фрукты'},
            {Price: 80, Material: 'Апельсины', MaterialGroup: 'Фрукты'},
            {Price: 170.22, Material: 'Сыр Белебеевский', MaterialGroup: 'Сыры'}
        ]
    }

    toolBarItemChartShow_clicked() {
        const grouping = this.controls.Grid1.getGrouping()[0] || 'MaterialGroup';
        this.controls.chart1.dataSource = ko.mapping.fromJS(this.getGroupedData(grouping));
    }

    getGroupedData(param) {
        let obj = {};
        this.controls.Grid1.dataSource().forEach(f => {
            obj[f[param]()] = (obj[f[param]()] || 0) + f.Price();
        })
        return Object.keys(obj).map(key => ({ Group: key, Value: obj[key] }));
    }

    setChartSettings() {
        this.controls.chart1.instance.seriesGroups[0].series[0].showLabels = true;
        this.controls.chart1.instance.seriesGroups[0].series[0].radius = 120;
        this.controls.chart1.instance.seriesGroups[0].series[0].formatFunction = function(value, {}, e) {
            return `${value} руб.`;
        };
        this.controls.chart1.instance.seriesGroups[0].series[0].formatFunction = function(value, {}, e) {
            return (e && e.displayText == 'Group') ? `${value} руб.` : value;
        };
        this.controls.chart1.instance.seriesGroups[0].series[0].labels = {
            linesEnabled: false,
            radius: 100
        };
    }

    chart1_clicked(s, e) {
        const currentRow = this.controls.chart1.dataSource()[e.args.elementIndex];
        this.services.dialog.info(currentRow.Group() + ' на сумму ' + currentRow.Value() + ' руб.');
    }
}
