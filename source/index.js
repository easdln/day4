import './vendor'
import { Root } from 'ecosoft-lexema8'
import widgets from './widgets'
import units from './units.json'
import { RootRoute } from './routes/root'

new Root({
  units,
  widgets,
  routes: {
    root: RootRoute
  }
});