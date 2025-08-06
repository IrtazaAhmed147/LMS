import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './layout/Layout';
import Home from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';
import Signup from './pages/signup/Signup.jsx';
import Otp from './pages/otp/Otp.jsx';
import NotFound from './pages/notFound/NotFound.jsx';
import Course from './pages/course/Course.jsx';
import CreateCourse from './pages/createCourse/CreateCourse.jsx';
import SingleCourse from './pages/singleCourse/SingleCourse.jsx';
import EnrolledCourses from './pages/enrolledCourses/EnrolledCourses.jsx';
import YourCourses from './pages/yourCourses/YourCourses.jsx';
import LessonForm from './pages/createLesson/LessonForm.jsx';

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />

        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/course' element={<Course />} />
          <Route path='/single/course/:mode' element={<CreateCourse />} />
          <Route path='/course/:id' element={<SingleCourse />} />
          <Route path='/course/enrolled/:id' element={<EnrolledCourses />} />
          <Route path='/course/teacher/:id' element={<YourCourses />} />
          <Route path='/lesson/create' element={<LessonForm />} />
          <Route path="/lesson/edit/:lessonId" element={<LessonForm />} />
        </Route>






        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
