import { Form, Colors, ModelSource } from 'ecosoft-lexema8'; // импорт компонентов из библиотеки ecosoftlexema8
import template from './ModelDemoForm.xml'; // импорт макета документа
import ko from 'knockout';
import infoImg from 'current-theme/images/dark/help.png';
import PriceList_model from '../models/PriceList.model.json'


export default class ModelDemoForm extends Form {
    constructor(...args){
        super(...args);
        
        this.controls.Grid1.addGrouping('MaterialGroup', 0);

        new ModelSource(PriceList_model).load({ VCode: 1})
            .done(data => {
                this.controls.Grid1.dataSource = ko.mapping.fromJS(data.Detail);
                this.controls.DateTimeInput1.value = data.DocumentDate;
                this.controls.Grid1.addGrouping('MaterialGroup', 0);
        });
    }

    toolBarItemExit_clicked() {
        this.close();
    }

    ButtonCalc_clicked() {
        let sum = 0;
        let cnt = 0;
        
        this.controls.Grid1.dataSource().forEach(e => {
            console.log(e.MaterialGroup(), this.controls.LookupMaterialGroup.value.Name)
            if (e.MaterialGroup() == this.controls.LookupMaterialGroup.value.Name) {
                sum += e.Price();
                cnt++;
            }
        });

        this.controls.TextBoxTabRes.value = sum / cnt;
    }

    info_imageRenderer() {
        return infoImg;
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

    Grid1_cellValueChanged({ args }) {
        console.log(this.controls.Grid1.dataSource()[args.rowindex].MaterialGroup(args.newvalue.MaterialGroup.Name));
        if (args.datafield == 'Material') {
            this.controls.Grid1.dataSource()[args.rowindex].MaterialGroup(args.newvalue.MaterialGroup.Name)
        }
    }

    static get template(){
    return template;
    }
}
