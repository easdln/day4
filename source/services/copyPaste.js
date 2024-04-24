import { Service } from 'ecosoft-lexema8'

export default class CopyPasteService extends Service {
  get buffer() {
    return this._buffer;
  }
  set buffer(x) {
    this._buffer = x;
  }

  copy(source) {
    this.buffer = source;
  }

  paste() {
    return this.buffer;
  }
}