import { Form, Colors } from 'ecosoft-lexema8'; // импорт компонентов из библиотеки ecosoft-lexema8
import template from './AnalyticalFormHw.xml'; // импорт макета документа
import ko from 'knockout';

export default class ChartForm extends Form {
    constructor(...args) {
    super(...args);
        this.controls.Grid1.dataSource = ko.mapping.fromJS(this.dataGrid);
        this.controls.Grid1.addGrouping('Type', 0);
        // this.setChartSettings();
    }
    // макет документа
    static get template() {
        return template;
    }

    toolBarItemExit_clicked() {
        const grouping = this.controls.Grid1.getGrouping()[0] || 'Type';
        this.controls.chart1.dataSource = ko.mapping.fromJS(this.getGroupedData(grouping));
    }

    toolBarItemChartShow_clicked() {
        console.log('Печать!')
    }

    get dataGrid() {
        return [
            {Price: 10000, Type: 'Приход', Name: 'Зарплата', Date: '2-07-24'},
            {Price: 8045, Type: 'Приход', Name: 'Еда', Date: '12-07-24'},
            {Price: -17043, Type: 'Расход', Name: 'Одежда', Date: '8-07-24'}
        ]
    }

    Grid1_cellPainter({}, { column, data, row, value }) {
        return column == 'Price' ? (value > 100 ? Colors.green : Colors.yellow) : null;
    }

    getGroupedData(param) {
        let obj = {};
        this.controls.Grid1.dataSource().forEach(item => {
            obj[item[param]()] = (obj[item[param]()] || 0) + item.Price();
        })
        return Object.keys(obj).map(key => ({ Group: key, Value: obj[key] }));
    }

    setChartSettings() {
        this.controls.chart1.instance.seriesGroups[0].series[0].showLabels = true;
        this.controls.chart1.instance.seriesGroups[0].series[0].radius = 120;
        // this.controls.chart1.instance.seriesGroups[0].series[0].formatFunction = function(value, {}, e) {
        //     return `${value} руб.`;
        // };
        // this.controls.chart1.instance.seriesGroups[0].series[0].formatFunction = function(value, {}, e) {
        //     return (e && e.displayText == 'Group') ? `${value} руб.` : value;
        // };
        this.controls.chart1.instance.seriesGroups[0].series[0].labels = {
            linesEnabled: false,
            radius: 100
        };
    }

    // chart1_clicked(s, e) {
    //     const currentRow = this.controls.chart1.dataSource()[e.args.elementIndex];
    //     this.services.dialog.info(currentRow.Group() + ' на сумму ' + currentRow.Value() + ' руб.');
    // }
}