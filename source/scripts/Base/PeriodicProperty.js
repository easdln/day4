import { QuerySource} from 'ecosoft-lexema8';
import $ from 'jquery';

import PeriodicProperty_query from '../../queries/Base/PeriodicProperty.query.json';

export default class PeriodicProperty {
  constructor(form, modelProperty) {
    console.log('RtiSendPeriodicPropertyMessage scripts loaded');

    if(!form || !modelProperty) {
      throw 'PeriodicProperty ERROR! Empty constructor params';
    }

    Object.setPrototypeOf(this.__proto__, form);

    this.modelProperty = modelProperty;
    const queryParam = {
      ModelName: modelProperty,
      VCode: this.data.VCode()
    };
    (new QuerySource(PeriodicProperty_query)).load(queryParam)
    .done((data) => {
      this.property  = data;
    });
  }

  save() {
    let res = $.Deferred(),
      tableParam = [];

    this.property.forEach((p) => {
      if (this.data[p.ModelProperty]() 
        && ((p.DataType === 'string' && !p.ValueString)
          || (p.DataType === 'binary' && !p.ValueString)
          || (p.DataType === 'bigint' && !p.ValueInt)
          || (p.DataType === 'object' && !p.ValueInt)
          || (p.DataType === 'float' && !p.ValueFloat)
          || (p.DataType === 'date' && !p.ValueDate)
          )
        ) {
            tableParam.push({
              PeriodicPropertiesVCode: p.VCode,
              DocVCode: this.data.VCode(),
              BDate: new Date(),
              ValueString: p.DataType === 'object' ? this.data[p.ModelProperty]()[p.DisplayMember]
                : p.DataType === 'string' ? this.data[p.ModelProperty]() : null,
              ValueInt: p.DataType === 'object' ? this.data[p.ModelProperty]()[p.ValueMember]
                : p.DataType === 'int' ? this.data[p.ModelProperty]()
                : null,
              ValueDate: p.DataType === 'date' ? this.data[p.ModelProperty]() : null,
              ValueFloat: p.DataType === 'float' ? this.data[p.ModelProperty]() : null,
              ModelName: this.modelProperty,
              ModelProperty: p.ModelProperty
            }); 
        }
    });

    if (tableParam.length > 0) {
      const queryParam = { TableParam: tableParam };
      (new QuerySource(PeriodicProperty_query)).insert(queryParam).done(() => {
        console.log('PeriodicProperty saved');
        res.resolve();
      });  
    } else {
      res.reject();
    };
    return $.when(res);
  }
 }