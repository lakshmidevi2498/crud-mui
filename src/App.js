// import logo from './logo.svg';
import { Provider } from 'react-redux';
import './App.css';
import store from './redux/store'
import  Home  from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Provider store={store}>
      <Home/>
      <ToastContainer/>
    </Provider>
    
    </>
  );
}

export default App;
