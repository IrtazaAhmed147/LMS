import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Typography, CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createLesson, deleteLesson, getCourselesson, updatelesson } from '../../redux/actions/lessonActions';
import { notify } from '../../utils/HelperFunctions';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteModal from '../../components/modal/DeleteModal';
import CancelIcon from '@mui/icons-material/Cancel';

const LessonForm = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const { lessons, isLoading, error } = useSelector((state) => state.lesson);
  const [lectureCount, setLectureCount] = useState(1);
  const [box, setBox] = useState('create lecture');
  const [mode, setMode] = useState('create');
  const [lesson, setLesson] = useState({});
  const [lectureData, setLectureData] = useState([{ title: 'Lecture 1' }]);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [modal, setModal] = useState(false);
  const [againCall, setAgainCall] = useState(false);
  const [lessonImage, setLessonImage] = useState(null);

  useEffect(() => {
    if (box === 'allLectures') {
      dispatch(getCourselesson(courseId, token));
    }
  }, [box, againCall, courseId, dispatch, token]);

  useEffect(() => {
    if (lesson?.contentUrl) {
      setLessonImage(lesson.contentUrl);
    }
    if (lesson?.contentUrl?.name) {
      setLessonImage(URL.createObjectURL(lesson.contentUrl))
    }
  }, [lesson]);

  useEffect(() => {
    return () => {
      if (lessonImage) {
        URL.revokeObjectURL(lessonImage);
      }
    };
  }, [lessonImage]);

  const handleAddLecture = () => {
    if (lectureCount >= 3) {
      notify('error', "You can only add up to 3 lectures at once.");
      return;
    }
    setLectureCount(prev => prev + 1);
    setLectureData((prev) => [
      ...prev,
      { title: `Lecture ${prev.length + 1}` }
    ]);
  };

  const handleDecreaseLecture = (i) => {
    setLectureCount(prev => prev - 1);
    setLectureData((prev) => prev.filter((_, index) => index !== i));
  };

  const handleLectureContent = (e, i) => {
    setLectureData((prev) =>
      prev.map((item, index) =>
        index === i ? { ...item, content: e.target.files[0] } : item
      )
    );
  };

  const handleUpdateLectureContent = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLesson({
        ...lesson,
        contentUrl: file,
      });
      setLessonImage(URL.createObjectURL(file));

    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (mode === 'create') {
      const missingField = lectureData.some((lec) => !lec?.title?.trim() || !lec?.content);
      if (missingField) return notify('error', 'All lectures must have a title and an image.');

      formData.append("courseId", courseId);
      lectureData.forEach((lec, index) => {
        formData.append(`titles[${index}]`, lec.title);
        formData.append("files", lec.content);
      });

      dispatch(createLesson(formData, token))
        .then((msg) => notify('success', msg))
        .catch((err) => notify('error', err));
    } else if (mode === 'edit') {
      formData.append("title", lesson.title);
      formData.append("file", lesson.contentUrl);

      dispatch(updatelesson(formData, token, lesson?._id))
        .then((msg) => {
          setBox('allLectures');
          notify('success', msg);
        })
        .catch((err) => notify('error', err));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteLesson(token, id))
      .then((msg) => {
        setAgainCall(prev => !prev);
        setModal(false);
        notify('success', msg);
      })
      .catch((msg) => notify('error', msg));
  };

  return (
    <Box sx={{ minHeight: '100vh', px: { md: 1, xs: 0.5 }, py: 2, bgcolor: '#f9f9f9', overflowY: 'auto' }}>
      <Box sx={{ width: '98%', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography fontWeight={'bold'} sx={{ fontSize: { sm: 30, xs: 20 } }}>Lecture</Typography>
        <button
          disabled={isLoading}
          onClick={handleSubmit}
          style={{
            backgroundColor: 'rgb(45 45 45)', display: 'flex', gap: '5px',
            borderRadius: '8px', border: 'none', color: 'white',
            padding: '10px 20px'
          }}
        >
          {isLoading && <CircularProgress size={15} color='inherit' />} Submit
        </button>
      </Box>

      <Box
        mt={3}
        sx={{
          width: '98%',
          mx: 'auto',
          p: { sm: 4, xs: 1 },
          backgroundColor: 'white',
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: '1px solid #ddd'
        }}
      >
        {/* Tabs */}
        <Box sx={{
          padding: '4px 4px', display: 'flex', alignItems: 'center',
          backgroundColor: '#f9f9f9', boxShadow: '1px 1px 9px 1px #c1c1c1',
          borderRadius: '8px', overflow: 'hidden', height: { sm: '30px', xs: '60px' },
          width: { sm: '500px' }, marginBottom: '15px'
        }}>
          <Box onClick={() => { setBox('create lecture'); setMode('create'); }}
            sx={{ cursor: 'pointer', borderRadius: '6px', height: '100%', backgroundColor: box === 'create lecture' ? 'white' : 'transparent', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography sx={{ fontSize: { sm: 15, xs: 12 } }}>Create Lecture</Typography>
          </Box>
          <Box onClick={() => setBox('allLectures')}
            sx={{ cursor: 'pointer', borderRadius: '6px', height: '100%', backgroundColor: box === 'allLectures' ? 'white' : 'transparent', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography sx={{ fontSize: { sm: 15, xs: 12 } }}>All Lectures</Typography>
          </Box>
          <Box sx={{ cursor: 'not-allowed', borderRadius: '6px', height: '100%', backgroundColor: box === 'updateLecture' ? 'white' : 'transparent', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography sx={{ fontSize: { sm: 15, xs: 12 } }}>Update Lecture</Typography>
          </Box>
        </Box>

        {/* Create Lecture */}
        {box === 'create lecture' && (
          <Box my={3} sx={{ padding: '10px', backgroundColor: '#fff', boxShadow: '1px 1px 9px 1px #c1c1c1', borderRadius: '8px' }}>
            <Typography mb={3} fontWeight={'bold'} fontSize={18}>Create Course Curriculum</Typography>
            <button disabled={isLoading} className='common-btn' onClick={handleAddLecture} style={{ backgroundColor: '#6b6b6bdd' }}>
              {isLoading && <CircularProgress size={20} color='inherit' />} Add Lecture
            </button>
            {Array.from({ length: lectureCount }).map((_, i) => (
              <Box key={i} my={3} sx={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <Box mb={2} sx={{ width: '100%', position: 'relative', display: { sm: 'flex', xs: 'block' }, alignItems: 'center', gap: 2 }}>
                  <Box mb={2} sx={{ display: { sm: 'flex', xs: 'block' }, alignItems: 'center', gap: 2 }}>
                    <Typography fontWeight={'bold'} fontSize={16}>Lecture {i + 1}</Typography>
                    <Box
                      component={'input'}
                      disabled={isLoading}
                      type="text"
                      value={lectureData[i]?.title}
                      onChange={(e) =>
                        setLectureData((prev) =>
                          prev.map((item, index) =>
                            index === i ? { ...item, title: e.target.value } : item
                          )
                        )
                      }
                      sx={{ outline: 'none', width: { sm: '300px', xs: '100%' }, height: '30px', padding: '5px 10px', borderRadius: '8px', border: '1px solid #ddd' }}
                      placeholder="Enter a lecture title"
                    />
                  </Box>
                  <span style={{ position: 'absolute', top: '0px', right: '0px' }} onClick={() => handleDecreaseLecture(i)}>
                    <CancelIcon fontSize='medium' style={{ color: 'rgb(81 81 81)' }} />
                  </span>
                </Box>
                <Box>
                  <input
                    disabled={isLoading}
                    type="file"
                    id={`file-input-${i}`}
                    accept="image/*"
                    onChange={(e) => handleLectureContent(e, i)}
                    style={{ display: "none" }}
                  />
                  <label htmlFor={`file-input-${i}`}>
                    <Box component="span" className='fileSpan'>Upload File</Box>
                  </label>
                  {lectureData[i]?.content && (
                    <span style={{ marginLeft: "10px" }}>
                      {lectureData[i].content.name}
                    </span>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* All Lectures */}
        {box === 'allLectures' && (
          <Box>
            {isLoading ? (
              <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '40vh'
              }}>
                <CircularProgress color='inherit' />
              </Box>
            ) : error ? (
              <p>{error}</p>
            ) : (
              lessons?.map((lessonn) => (
                <Box key={lessonn?._id} sx={{ marginTop: '10px', padding: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ fontSize: { md: 16, xs: 12 } }}>{lessonn?.title}</Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <span onClick={() => {
                      setMode('edit');
                      setBox('updateLecture');
                      setLesson(lessonn);
                    }}>
                      <BorderColorOutlinedIcon fontSize='small' />
                    </span>
                    <span onClick={() => {
                      setModal(true);
                      setSelectedLessonId(lessonn?._id);
                    }}>
                      <BackspaceOutlinedIcon fontSize='small' />
                    </span>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        )}

        {/* Update Lecture */}
        {box === 'updateLecture' && (
          <Box my={3} sx={{ padding: '10px', backgroundColor: '#fff', boxShadow: '1px 1px 9px 1px #c1c1c1', borderRadius: '8px' }}>
            <Typography mb={3} fontWeight={'bold'} fontSize={18}>Update Lecture</Typography>
            <Box my={3} sx={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
              <Box mb={2} sx={{ display: { sm: 'flex', xs: 'block' }, alignItems: 'center', gap: 2 }}>
                <Typography fontWeight={'bold'} fontSize={16}>Lecture</Typography>
                <Box
                  component={'input'}
                  disabled={isLoading}
                  type="text"
                  value={lesson?.title || ""}
                  onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
                  sx={{ width: { sm: '300px', xs: '100%' }, height: '30px', padding: '5px 10px', borderRadius: '8px', border: '1px solid #ddd' }}
                  placeholder="Enter a lecture title"
                />
              </Box>
              {lessonImage && (
                <Box mt={2}>
                  <Typography variant="subtitle2" mb={1}>Image Preview:</Typography>
                  <Box
                    component="img"
                    src={lessonImage}
                    alt="ImagePreview"
                    sx={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: 2, border: '1px solid #ddd' }}
                  />
                </Box>
              )}
              <Box>
                <input
                  disabled={isLoading}
                  type="file"
                  id={`file-input-update`}
                  accept="image/*"
                  onChange={handleUpdateLectureContent}
                  style={{ display: "none" }}
                />
                <label htmlFor={`file-input-update`}>
                  <Box component="span" className='fileSpan'>Upload File</Box>
                </label>
                {lesson?.content && (
                  <span style={{ marginLeft: "10px" }}>
                    {lesson?.content?.name}
                  </span>
                )}
              </Box>
            </Box>
          </Box>
        )}

        {/* Delete Modal */}
        {modal && (
          <DeleteModal
            type={'lesson'}
            setModal={setModal}
            id={selectedLessonId}
            handleDelete={handleDelete}
          />
        )}
      </Box>
    </Box>
  );
};

export default LessonForm;
