import { Registry } from 'ecosoft-lexema8'; 
import template from './ArticleInRegistry.xml'; // импорт макета документа
import model from '../models/ArticleIn.model.json';


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
        return super.createDocument('ArticleInRegistry');
    }

    toolBarItemNewClick() {
        this.createDocument();
    }
}
