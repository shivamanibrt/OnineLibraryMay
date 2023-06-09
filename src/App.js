import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SignIn } from './Pages/Signup-signin/SignIn';
import { SignUp } from './Pages/Signup-signin/SignUp';
import { Home } from './Pages/Home/Home';
import { Dashboard } from './Pages/Dashboard/Dashboard';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Config/firebase-config';
import { getUserAction } from './Pages/Signup-signin/userAction';
import { Books } from './Pages/Book/Books';
import { MainLayout } from './Components/Layout/MainLayout'
import { History } from './Pages/History/History';
import { User } from './Pages/User/User';
import { Profile } from './Pages/Profile/Profile';
import { NewBooks } from './Pages/Book/NewBooks';
import { BookLanding } from './Components/Book Card/BookLanding';
import { BooksList } from './Pages/Book/BooksList';
import { About } from './Pages/About/About';


function App() {
  const dispatch = useDispatch();

  //let firebase to re auth user if they relod the page
  onAuthStateChanged(auth, (user) => {
    user?.uid && dispatch(getUserAction(user.uid))
  })

  return (
    <>
      <MainLayout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/book/:bookId' element={<BookLanding />} />
          <Route path='signIn' element={<SignIn />} />
          <Route path='signUp' element={<SignUp />} />

          <Route path='booksList' element={<BooksList />} />
          <Route path='about' element={<About />} />

          <Route path='dashboard' element={<Dashboard />} />
          <Route path='profile' element={<Profile />} />
          <Route path='books' element={<Books />} />
          <Route path='newBooks' element={<NewBooks />} />

          <Route path='history' element={<History />} />
          <Route path='user' element={<User />} />
        </Routes>
        <ToastContainer />
      </MainLayout >
    </>
  );
}

export default App;
