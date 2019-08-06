import React from 'react';
import ReactDOM from 'react-dom';
import Root from './client/Root';
//import App from './shared/App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
