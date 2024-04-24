export default class CreateXmlForUPP {
  static getXmlData(obj, additionalData = {}) {
    const eDate = this.dateFormat(obj.EDate);
    const bDate = obj.BDate ? this.dateFormat(obj.BDate) : eDate;
    const result = {
      ...additionalData,
      IncludeUnconfirmedReceipts: obj.IncludeUnconfirmedReceipts ? obj.IncludeUnconfirmedReceipts : 0,
      Org: obj.Org,
      AccountPlan: 1,
      Bdate: bDate,
      Edate: eDate,
      Account: this.distinctStr(obj.Schet),
      'Склад': this.distinctStr(obj.Storage),
      'Номенклатура': this.distinctStr(obj.Material),
      'Партия': this.distinctStr(obj.PartCode),
      'Контрагент': this.distinctStr(obj.Contractor),
      'Единица измерения': this.distinctStr(obj.Measure),
      AlterMeasure: obj.AlterMeasure
    };
    return this.ConvertObjectToXml(result);
  }

  static dateFormat(date) {
    if (date instanceof Date) {
      const dd = date.getDate();
      const mm = date.getMonth() + 1; //January is 0!
      const yyyy = date.getFullYear();
      return `${yyyy}${(mm < 10?'0' + mm:mm)}${(dd < 10?'0' + dd:dd)}`;
    }
    return '';
  }

  static distinctStr(str) {
    if (!str) return null;
    const s = str.toString();
    const arr = s.replace(', ', ',').split(',');
    if (arr.length == 1) return s;
    const obj = {};
    arr.forEach(it => obj[it] = true);
    return Object.keys(obj).join(',');
  }

  static ConvertObjectToXml(obj) {
    return Object.keys(obj).map(key => {
      const v = obj[key];
      const value = v !== null && v !== undefined ? v : '';
      return `<F><N>${key}</N><V>${value}</V></F>`;
    }).join('');
  }
}