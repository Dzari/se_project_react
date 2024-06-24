import './app.css';
import Header from '../Header/header';
import Main from '../Main/main';

export default function App() {
  return (
    <div className="app">
      <div className="app__wrapper">
        <Header />
        <Main />
      </div>
    </div>
  );
}
