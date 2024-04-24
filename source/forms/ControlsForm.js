import { Form, Colors } from 'ecosoft-lexema8'; // импорт компонентов из библиотеки ecosoftlexema8
import template from './ControlsForm.xml'; // импорт макета документа
import infoImg from 'current-theme/images/dark/help.png';


export default class ControlsForm extends Form {
    constructor(...args){
        super(...args);

        this.controls.Grid1.dataSource = ko.mapping.fromJS(this.dataGrid);
        this.controls.Grid1.addGrouping('MaterialGroup', 0);
    }

    toolBarItemExit_clicked() {
        this.close();
    }
    
    ButtonPrint_clicked() {
        this.controls.TextBox1.value = this.controls.DateTimeInput1.value ?
        `${this.controls.DateTimeInput1.value.toLocaleDateString('ru-ru')}
        ${this.controls.DateTimeInput1.value.toTimeString().substr(0, 8)}`: '';
    }

    get dataGrid() {
        return [
            {Price: 60.88, Material: 'Яблоки', MaterialGroup: 'Фрукты'},
            {Price: 80, Material: 'Апельсины', MaterialGroup: 'Фрукты'},
            {Price: 170.22, Material: 'Сыр Белебеевский', MaterialGroup: 'Сыры'}
        ]
    }

    ButtonCalc_clicked() {
        let sum = 0;
        let cnt = 0;
        this.controls.Grid1.dataSource().forEach(e => {
            sum += e.Price();
            cnt++;
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

    static get template(){
    return template;
    }
}
