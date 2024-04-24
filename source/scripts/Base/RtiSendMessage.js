import { RtiService, QuerySource} from 'ecosoft-lexema8';
import $ from 'jquery';

import RtiLoginList_query from '../../queries/Base/RtiSendMessageLoginList.query.json'

export default class RtiSendMessage {
  constructor(form) {
    console.log('RtiSendMessage scripts loaded');

    this.form = form;

    // уникальный код экземпляра
    this.guid  = (() => {
      const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      };

      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    })();
  }

  /* отправка сообщение
    roles (массив) роли пользователей, по которым надо сделать рассылку
    department (число) - код отделения, по которому надо разослать сообщение
    messageType (строка) - тип сообщения
    rtiParams (объект) - доп параметры, которые надо отослать */
  sendMessage({roles, department, messageType, value, vcode, changeStatus}) {
  	let Roles = [];
  	roles.forEach(a => Roles.push({RoleName: a}));

  	const queryParms = {
        Department : (department || (this.form.data.Department() ? this.form.data.Department().VCode : 0)),
        RoleName : Roles,
        OrgID: this.form.services.holding.currentOrganization
      };
    //console.log('sendMessage', queryParms);
    (new QuerySource(RtiLoginList_query)).load(queryParms).done((LoginList)=>{
      const message = {
        receivers: $.map(LoginList, function(elem){return elem.Login}),
        items: {
          messageType: messageType,
          guid: this.guid,
          vcode : vcode,
          department:department,
          changeStatus:changeStatus ? 1:0
        }
      };
      // переносим доп свойства
      /*for(let par in rtiParams) {
      	message.items[par] = rtiParams[par]
      };*/
      message.items.value = JSON.stringify(value);
      // отправляем
      console.log('Отправляем сообщение по rti сервису', queryParms, message );
      this.form.services.rti.sendMessage(message);
    });
  }
 }