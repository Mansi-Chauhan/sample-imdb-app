import Dashboard from './components/dashboard/index';
import Synopses from './components/synopses/index'
import  History  from './components/History/index';


const routes = [
  { path: '/', exact: true, name: 'Dashboard', component: <Dashboard />},
  { path: '/dashboard', exact: true, name: 'Dashboard', component: <Dashboard />},
  { path: '/synopses/:id', exact: true, name: 'Synopses', component: <Synopses />},
  { path: '/history/', exact: true, name: 'History', component: <History />}
];

export default routes;

