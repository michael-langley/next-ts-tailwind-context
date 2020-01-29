import { AuthProvider } from '../context/index';
import { Provider } from 'react-redux';
import store from '../store';

import '../styles/index.css';
function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}
export default App;
