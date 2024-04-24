import { Document, PageBlocker } from 'ecosoft-lexema8';

export default class BaseDocumentForm extends Document {
  constructor(...args) {
    super(...args);

    this.baseDocumentForm = {
      closingFlag: 0 // 0-можно закрывать форму, 1 - нельзя закрывать, 2 - проверку прошел, можно закрывать
    };

    this.baseDocumentForm.SaveDocument = () => {
      let result = $.Deferred();

      this.BeforeSave()
        .done(() => {
          PageBlocker.on();
          this.save()
            .done(() => {
              this.services.message.info('base', 'save');
              this.AfterSave();
              PageBlocker.off();
              result.resolve();
            })
            .fail(() => {
              console.log('save.fail');
              PageBlocker.off();
              result.reject();
            });
        })
        .fail(() => {
          PageBlocker.off();
          result.reject();
        });

      return $.when(result);
    };

    this.baseDocumentForm.SaveAndCloseDocument = () => {
      this.baseDocumentForm.SaveDocument().done(() => {
        this.baseDocumentForm.closingFlag = 0;
        this.close();
        this.AfterClose();
      });
    };

    this.baseDocumentForm.CloseDocument = () => {
      if (this.actionFlags.isModified && this.baseDocumentForm.closingFlag < 2 && !this.readOnly) {
        this.baseDocumentForm.closingFlag = 1;
        this.services.message.confirm('base', 'confirmSaveAfterChange')
          .done(() => this.baseDocumentForm.SaveAndCloseDocument())
          .fail(() => {
            this.baseDocumentForm.closingFlag = 2;
            this.close();
            this.AfterClose();
          });
      } else {
        this.baseDocumentForm.closingFlag = 0;
        this.AfterClose();
      };
    };

    this.SetOldData();
  }

  static getDataParameters(args) {
    return super.getDataParameters(args).then(def => {
      return { ...def, key: args.key };
    });
  }

  /** функция, выполняемая перед сохранением. 
   * @returns Deferred
  */
  BeforeSave() {
    console.log('BeforeSave заглушка');
    let result = $.Deferred();
    if (this.readOnly) {
      result.reject();
      this.services.message.error('base', 'canNotBeSaved');
    }
    else {
      result.resolve();
    }

    return $.when(result);
  };

  /** функция, выполняемая после сохранения.*/
  AfterSave() {
    this.SetOldData();
  };

  /** функция сохранения документа
   * @returns Deferred
  */
  SaveDocument() {
    let result = $.Deferred();

    this.baseDocumentForm.SaveDocument()
    .done(() => result.resolve())
    .fail(() => {console.log('SaveDocument.fail'); result.reject()});

    return $.when(result);
  };

  /** функция сохранения документа с последующим закрытием формы */
  SaveAndCloseDocument() {
    this.baseDocumentForm.SaveAndCloseDocument();
  };

  /** закрытие документа*/
  CloseDocument() {
    this.close();
  };

  closing() {
  //  console.log('closing', this);
    this.baseDocumentForm.CloseDocument();
    return this.baseDocumentForm.closingFlag === 1;
  };

  /** Флаг "только чтение" для документа
   * @returns bool
   */
  get readOnly() {
    return false;
  }

  /** Событие после закрытия формы */
  AfterClose() {}

  /** Начальное состояние данных в модели*/
  get oldData() {
    return this._oldData;
  }

  /** Зафиксировать начальное текущее состояние данных в модели */ 
  SetOldData() {
    this._oldData = ko.mapping.toJS(this.data);
  }

  /** Свойства, которые были изменены, но не сохранены*/
  get modifiedData() {
    let newData = ko.mapping.toJS(this.data);
    let res = {};
    for(let key in newData) {
      if (!['VCode', 'COrg', 'WOrg', 'CDate', 'WDate', 'CHost', 'WHost', 'CUser', 'WUser'].includes(key)
        && !Array.isArray(newData[key])
        && (this.oldData[key]||'') != (newData[key]||'')) {
        res[key] = {
          newValue: newData[key],
          oldValue: this.oldData[key]
        }
      }
    };
    return res;
  }
}
