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
import YourCourses from './pages/yourCourses/YourCourses.jsx';
import LessonForm from './pages/createLesson/LessonForm.jsx';
import Auth from './pages/auth/Auth.jsx';
import Instructor from './pages/instructor/Instructor.jsx';
import Navbar from './components/navbar/Navbar.jsx';

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
  <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/instructor" element={<Instructor />} />
          <Route path='/instructor/create-new-course' element={<CreateCourse />} />

        {/* <Route element={<Layout />}> */}
          <Route index element={<Home />} />
          <Route path='/course' element={<Course />} />
          <Route path='/course/:id' element={<SingleCourse />} />
          <Route path='/course/enrolled/:id' element={<EnrolledCourses />} />
          <Route path='/course/teacher/:id' element={<YourCourses />} />
          <Route path='/lesson/create/:courseId' element={<LessonForm />} />
          <Route path="/lesson/edit/:courseId/:lessonId" element={<LessonForm />} />
        {/* </Route> */}






        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
