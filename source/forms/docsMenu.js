import { Form } from 'ecosoft-lexema8'
import template from './docsMenu.xml'

export default class DocsMenu extends Form {
  static get template() {
    return template;
  }

  itemClicked() {
    if (!this.key) this.close();
  }
}
