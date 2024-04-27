import { Registry } from 'ecosoft-lexema8'; 
import template from './PriceListRegistry.xml'; // импорт макета документа
import model from '../models/PriceList.model.json';

export default class PriceListRegistry extends Registry {
    constructor(...args) {
    super(...args);
    }

    createDocument() {
    return super.createDocument('PriceListForm');
    }

    static get template() {
    return template;
    }

    static get binding() {
    return model;
    }

    toolBarItemNewClick() {
    this.createDocument();
    }

    toolBarItemRemoveClick() {
    this.deleteSelectedDocuments();
    }

    toolBarItemSelectPeriod_clicked() {
        this.openDialog();
    }
}
