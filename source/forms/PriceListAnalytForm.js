import { Form, QuerySource } from 'ecosoft-lexema8'; 
import template from './PriceListAnalytForm.xml'; // импорт макета документа
import GetPriceLists_query from '../queries/GetPriceLists.query.json';
import ko from 'knockout';

export default class PriceListAnalytForm extends Form {
    constructor(...args) {
        super(...args);
    }
    // макет документа
    static get template() {
        return template;
    }

    toolBarItemExit_clicked() {
        this.close();
    }

    toolBarItemSearch_clicked() {
        const qParam = {
                Material: (this.controls.LookupMaterial.value || {}).VCode || 0
        }
        new QuerySource(GetPriceLists_query).load(qParam)
            .done(result => {
                this.controls.Grid1.dataSource = ko.mapping.fromJS(result);
            })
    }
}
