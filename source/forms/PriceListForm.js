import { Document, Colors } from 'ecosoft-lexema8'; 
import template from './PriceListForm.xml'; // импорт макета документа
import model from '../models/PriceList.model.json'
import infoImg from 'current-theme/images/dark/help.png';

export default class PriceListForm extends Document {
    constructor(...args) {
        super(...args);
    }
    // макет документа
    static get template() {
        return template;
    }

    static get binding(){
        return model;
    }

    toolBarItemSave_clicked() {
        this.save();
    }

    toolBarItemExit_clicked() {
        this.close();
    }

    info_imageRenderer() {
        return infoImg;
    }

    Grid1_cellClicked({ args }) {
        if (args.datafield == 'Info') {
            this.services.dialog.info(`${args.row.bounddata.Material.Name} по ${args.row.bounddata.Price} руб`);
        }
    }

    Grid1_cellPainter({}, { column, data, row, value }) {
        return column == 'Price' ? (value > 100 ? Colors.yellow : Colors.green)
        : (column == 'Info') ? Colors.indigo
        : null;
    }

    Grid1_cellValueChanged({ args }) {
        if (args.datafield == 'Material') {
        this.controls.Grid1.dataSource()[args.rowindex].MaterialGroup(args.newvalue.MaterialGroup.Name)
        }
    }
}
