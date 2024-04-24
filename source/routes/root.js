import { RootRoute as StandardRootRoute } from 'ecosoft-lexema8'
import StartForm from '../forms/start'

export class RootRoute extends StandardRootRoute {
  get StartForm() {
    return StartForm;
  }
}
