import { Service, QuerySource, ModelSource } from 'ecosoft-lexema8';
import $ from 'jquery';

export default class userInfo extends Service {
  constructor(...args){
  	super(args);
  }

  get department() {
  	return this._department;
  }

  set department(value) {
    this._department = value;
  }
}