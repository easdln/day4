import { Document } from 'ecosoft-lexema8'; 
import template from './ArticleInComingForm.xml'; 
import model from '../models/ArticleOut.model.json';

export default class PriceListForm extends Document {
    constructor(...args) {
        super(...args);
    }
    // макет документа
    static get template() {
        return template;
    }

    toolBarItemExit_clicked() {
        this.close()
    }

    toolBarItemSave_clicked() {
        this.save();
    }

    static get binding() {
        return model;
    }
}
