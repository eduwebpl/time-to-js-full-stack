import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { MainMenu } from './components/MainMenu';
import { RestaurantPage } from './components/RestaurantPage';
import { OrderPage } from './components/OrderPage';
import { SignInPage } from './components/SignInPage';
import { UserNavBar } from './components/UserNavBar';

function App() {
  return (
    <main className="container">
      <Header />
      <UserNavBar />
      <div className="columns">
        <div className="column is-2">
          <MainMenu />
        </div>
        <div className="column">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="restaurant/:id" element={<RestaurantPage />} />
            <Route path="order/:id" element={<OrderPage />} />
            <Route path="sign-in" element={<SignInPage />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
