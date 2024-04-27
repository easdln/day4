import { Form, FileUpload } from 'ecosoft-lexema8'; // импорт компонентов из библиотеки ecosoftlexema8
import template from './MovementInComingForm.xml'; // импорт макета документа
import infoImgAdd from 'current-theme/images/controls/add.png';
import infoImgDel from 'current-theme/images/controls/delete.png';
import infoImgView from 'current-theme/images/controls/preview.png';
import ko from 'knockout';

export default class MovementInComingForm extends Form {
    constructor(...args){
        super(...args);

        this.controls.GridDetail.dataSource = ko.mapping.fromJS(this.dataGridCustom);
        this.controls.GridDetail.addGrouping('Sum', 0);
    }

    toolBarItemExit_clicked() {
        this.close();
    }

    info_imageAdd() {
        return infoImgAdd;
    }

    info_imageDelete() {
        return infoImgDel;
    }

    info_imageView() {
        return infoImgView;
    }

    static get template(){
        return template;
    }

    get dataGridCustom() {
        return JSON.parse(`[
            {"Sum":54457,"Article":"ТЦ"},
            {"Sum":564,"Article":"Еда"},
            {"Sum":764,"Article":"Одежда"}]`);
    }

    cellClicked({ args: { datafield,rowindex } }){
        if (datafield == 'Add'){
            console.log("Действие по клику на ссылку без открытия новой вкладки");
            FileUpload.choose({
                multiple: false
            }).done((x) => {
                console.log(x);
                this.data.Detail()[rowindex].file(x.fileId);
                console.log(this.File);
            }).fail(function(x) {
                console.log('error: ', x);
            });
        }
    }
}
