import { Form, Colors, QuerySource } from 'ecosoft-lexema8'; // импорт компонентов из библиотеки ecosoftlexema8
import template from './AnalyticalForm.xml'; // импорт макета документа
import ArticleType_query from '../queries/ArticleType.query.json';
import ko from 'knockout';

export default class ControlsForm extends Form {
    constructor(...args){
        super(...args);

        this.controls.GridDetail.dataSource = ko.mapping.fromJS(this.dataGridCustom);
        this.controls.GridDetail.addGrouping('MaterialGroup', 0);
    }
    
    ButtonPrint_clicked() {
        this.controls.TextBox1.value = this.controls.DateTimeInput1.value ?
        `${this.controls.DateTimeInput1.value.toLocaleDateString('ru-ru')}
        ${this.controls.DateTimeInput1.value.toTimeString().substr(0, 8)}`: '';
    }

    get dataGridCustom() {
        return JSON.parse(`[
            {"Type":"Приход","Name":"ЗарПлата","DocumentDate":"2020-06-10","Sum":10000},
            {"Type":"Расход","Name":"Еда","DocumentDate":"2020-06-15","Sum":-1500},
            {"Type":"Расход","Name":"Одежда","DocumentDate":"2020-06-20","Sum":-3500}]`);
    }


    Grid1_cellClicked({ args }) {
        if (args.datafield == 'Info') {
            this.controls.TextBoxTabRes.value = `${args.row.bounddata.Material} по ${args.row.bounddata.Price} руб`;
        }
    }

    Grid1_cellPainter({}, { column, data, row, value }) {
        return column == 'Price' ? (value > 100 ? Colors.yellow : Colors.green)
        : (column == 'Info') ? Colors.indigo
        : null;
    }

    static get template(){
        return template;
    }

    toolBarItemLoad_clicked() {
        const qParam = {
            BDate: (this.controls.LookupMaterial.value || {}).VCode || 0
        }
        new QuerySource(ArticleType_query).load(qParam)
            .done(result => {
                console.log(result)
                this.controls.GridDetail.dataSource = ko.mapping.fromJS(result);
            })
    }
}
