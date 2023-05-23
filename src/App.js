import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SignIn } from './Pages/Signup-signin/SignIn';
import { SignUp } from './Pages/Signup-signin/SignUp';
import { Home } from './Pages/Home/Home';
import { MainLayout } from './Components/MainLayout/MainLayout';
import { PrivatePage } from './Pages/PrivatePage/PrivatePage';
import { Dashboard } from './Pages/Dashboard/Dashboard';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Config/firebase-config';
import { getUserAction } from './Pages/Signup-signin/userAction';


function App() {

  //let firebase to re auth user if they relod the page
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (user) => {
    user?.uid && dispatch(getUserAction(user.uid))
  })

  return (
    <>
      <MainLayout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='signIn' element={<SignIn />} />
          <Route path='signUp' element={<SignUp />} />
          <Route path='dashboard' element={<PrivatePage> <Dashboard /></PrivatePage>} />

        </Routes>
      </MainLayout>
      <ToastContainer />
    </>

  );
}

export default App;
