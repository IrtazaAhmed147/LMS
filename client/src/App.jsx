import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './layout/Layout';
import Home from './pages/home/Home.jsx';
import Otp from './pages/otp/Otp.jsx';
import NotFound from './pages/notFound/NotFound.jsx';
import Course from './pages/course/Course.jsx';
import CreateCourse from './pages/createCourse/CreateCourse.jsx';
import SingleCourse from './pages/singleCourse/SingleCourse.jsx';
import EnrolledCourses from './pages/enrolledCourses/EnrolledCourses.jsx';
import LessonForm from './pages/createLesson/LessonForm.jsx';
import Auth from './pages/auth/Auth.jsx';
import Instructor from './pages/instructor/Instructor.jsx';
import ProtectedRoute from './layout/protectedRoute/protectedRoute.jsx';
import LessonPage from './pages/lessonPage/LessonPage.jsx';
import './App.css'

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

        <Route path="/auth" element={<Auth />} />
        <Route path="/otp" element={<Otp />} />
        <Route element={<ProtectedRoute allowedRoles={"teacher"} />}>
          <Route path="/instructor" element={<Instructor />} />
          <Route path='/instructor/create-new-course' element={<CreateCourse />} />
          <Route path='/instructor/create-new-lecture/:courseId' element={<LessonForm />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={"student"} />}>
          <Route path='/lesson/detail/:id' element={<LessonPage />} />
          <Route element={<Layout />}>

            <Route path='/' element={<Home />} />
            <Route path='/courses' element={<Course />} />
            <Route path='/course/detail/:id' element={<SingleCourse />} />
            <Route path='/course/enrolled/:id' element={<EnrolledCourses />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
