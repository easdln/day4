export default class DateFuns {
  /**
   * Выводит первый день месяца
   * @param {Date} d Дата
   */
  static firstDayMonth(d) {
    FirstDayMonth(d); 
  }

  /**
   * Выводит последний день месяца
   * @param {Date} d Дата
   */
  static lastDayMonth(d) {
    LastDayMonth(d);
  }

  /**
   * Обрезает время
   * @param {Date} d Дата
   */
  static shortDate(d) {
    ShortDate(d);
  }

  /**
   * Преобразует дату в строку
   * @param {Date} d Дата
   */
  static toString(d) {
    DateToString(d);
  }
} 


/**
 * Выводит первый день месяца
 * @param {Date} d Дата
 */
export function FirstDayMonth(d) {
  if(!d || !Date.parse(d))
    console.error('ошибка вх параметра', d);
  
  return new Date(d.getFullYear(), d.getMonth(), 1); 
}

/**
 * Выводит последний день месяца
 * @param {Date} d Дата
 */
export function LastDayMonth(d) {
  if(!d || !Date.parse(d))
    console.error('ошибка вх параметра', d);

    return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

/**
 * Обрезает время
 * @param {Date} d Дата
 */
export function ShortDate(d) {
  if(!d || !Date.parse(d))
    console.error('ошибка вх параметра', d);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/**
 * Преобразует дату в строку в формат dd.MM.yyyy
 * @param {Date} d Дата
 */
export function DateToString(d) {
  if(!d || !Date.parse(d))
    console.error('ошибка вх параметра', d);

  return d.toLocaleDateString('ru-ru').substring(0, 10);
}