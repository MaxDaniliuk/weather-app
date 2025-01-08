import './styles/styles.css';
import displayResponse from './components/displayResponse';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

function startApp() {
  displayResponse();
}

startApp();
