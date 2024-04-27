import { Registry } from 'ecosoft-lexema8'; 
import template from './MovementComingRegistry.xml'; // импорт макета документа
import model from '../models/Coming.model.json';


export default class PriceListForm extends Registry {
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

    createDocument() {
        return super.createDocument('MovementComingForm');
    }

    toolBarItemNewClick() {
        this.createDocument();
    }
}
