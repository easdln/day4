import { Form, FileUpload } from 'ecosoft-lexema8'; // импорт компонентов из библиотеки ecosoft-lexema8
import template from './FileDemoForm.xml'; // импорт макета документа

export default class FileDemoForm extends Form {
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

    ButtonUpload_clicked() {
        FileUpload.choose({
            multiple: false
        }).done((x) => {
            console.log(x);
        }).fail(function(x) {
            console.log('error: ', x);
        });
        }   
    
    FileUpload1_valueChanged(s, e) {
        console.log(this.controls.FileUpload1.fileId);
    }

    CustomImage1_valueChanged({}, imageId) {
        console.log(imageId);
    }
}
