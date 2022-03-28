import RoutesComponent from './Routes.js'

import store from './services/store.js'
import {Provider} from 'react-redux'


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RoutesComponent/>
      </Provider>
    </div>
  );
}

export default App;
