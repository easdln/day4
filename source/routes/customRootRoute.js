import { RootRoute } from 'ecosoft-lexema8'
import StartForm from '../forms/start'

export class CustomRootRoute extends RootRoute {
  get StartForm() {
    return StartForm;
  }
}
