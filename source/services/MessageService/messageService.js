import { Service, QuerySource } from 'ecosoft-lexema8'
import Messages from './messages.js'; // коллекция выводимых сообщений

export default class MessageService extends Service {
  constructor(...args){
    super(...args);

    this.messages = new Messages();
  }

  /**Возвращает текст сообщения 
   * @param  {string} group имя группы сообщений
   * @param  {string} id    имя сообщения
   * @param  {object} param объект с дополнительными параметрами
   * @param  {string} param.property свойство в сообщении
   * @return {string} текст сообщения
   */
  getMessageText(group, id, param) { 
    let mes = ''
      , property = typeof(param) === 'object' ? param.property : param;
    if (!property) {
      mes = this.messages[group]? (this.messages[group][id] || 'Ошибка'): 'Ошибка';
    } else {
      mes = this.messages[group]? (this.messages[group][id] ? (this.messages[group][id][property]) : null) : null;
    };
    
    eval('mes = `' + (mes || '') + '`')
    return mes;
  }

  /**Выводит информационное сообщение
   * @param  {string} group имя группы сообщений
   * @param  {string} id    имя сообщения
   * @param  {boolean} flag    флаг - не скрывать сообщение
   * @param  {object} param объект с дополнительными параметрами
   */
  info(group, id, flag, param) {
    console.log('info', group, id);
    this.owner.services.dialog.info(this.getMessageText(group, id, {...param}), flag);
  }

  /**Выводит сообщение об ошибке
   * @param  {string} group имя группы сообщений
   * @param  {string} id    имя сообщения
   * @param  {object} param объект с дополнительными параметрами
   */
  error(group, id, param) {
    console.log('error', group, id);
    this.owner.services.dialog.error(this.getMessageText(group, id, {...param}));
  }

  /**Выводит подтвержедние с двумя вариантами ответа
   * @param  {string} group имя группы сообщений
   * @param  {string} id    имя сообщения
   * @param  {object} param объект с дополнительными параметрами
   * @param  {string} param.property свойство в сообщении
   */
  confirm (group, id, param) {
    console.log('confirm', group, id);
    
    let result = $.Deferred();
    let mes = this.getMessageText(group, id, {...param, property: 'text'}) || ''
      , bt1 = this.getMessageText(group, id, {...param, property: 'button1'}) || ''
      , bt2 = this.getMessageText(group, id, {...param, property: 'button2'}) || '';
    
    this.owner.services.dialog.confirm(mes, bt1, bt2)
      .done(() => result.resolve())
      .fail(() => result.reject());

    return $.when(result);
  }

  /**Выводит сообщение с кнопкой подтверждения
   * @param  {string} group имя группы сообщений
   * @param  {string} id    имя сообщения
   * @param  {object} param объект с дополнительными параметрами
   * @param  {string} param.property свойство в сообщении
   */
  message(group, id, param) {
    let result = $.Deferred();
    let mes = this.getMessageText(group, id, {...param, property: 'text'}) 
        || this.getMessageText(group, id, param)
      , bt = this.getMessageText(group, id, {...param, property: 'button'}) || 'OK';

    this.owner.services.dialog.message(mes, bt)
      .done(() => result.resolve());

    return $.when(result);
  }
}