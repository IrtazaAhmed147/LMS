import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import LessonCard from '../../components/card/LessonCard'
import { useDispatch, useSelector } from 'react-redux'
import { getCourselesson } from '../../redux/actions/lessonActions'
import { Link, useParams } from 'react-router-dom'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

function LessonPage() {

  const { lessons } = useSelector((state) => state.lesson)
  const { id } = useParams()
  const [selectedLecture, setSelectedLecture] = useState({
    contentUrl: lessons?.contentUrl,
    title: lessons?.title,
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCourselesson(id))
  }, [])

  return (
    <>
      <Box sx={{
        height: 50,
        width: '100%',
        bgcolor: '#1f2131',
        display: 'flex',
        alignItems: 'center',
        padding: { md: '20px', sm: '20px', xs: '10px' }
      }}>
        <Link to={'/courses'}>
          <button className='common-btn' style={{ backgroundColor: 'rgb(20 20 20)' }}><KeyboardBackspaceIcon /> Back To Courses</button>
        </Link>
      </Box>

      <Box sx={{ display: { md: 'flex', xs: 'block' }, backgroundColor: '#101118', minHeight: '100vh', width: '100%', padding: { md: '20px', sm: '20px', xs: '10px' } }}>
        <Box sx={{ width: { md: '60%', xs: '100%' }, borderRight: { md: '1px solid #fff', xs: 'none' } }}>
          <Box component={'img'} src={selectedLecture?.contentUrl || lessons[0]?.contentUrl || 'https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png'} sx={{ width: { md: '90%', xs: '100%' }, maxHeight: { md: '500px', sm: '400px', xs: '300px' } }} margin={'auto'} />
          <Typography fontWeight={'bold'} sx={{ fontSize: { md: '40px', sm: '40px', xs: '20px' } }} color='#fff'>{selectedLecture?.title || lessons[0]?.title || 'Title'}</Typography>
        </Box>
        <Box sx={{ width: { md: '40%', xs: '100%' }, padding: { md: '10px', xs: '0px' }, marginTop: { md: '0', xs: '10px' } }} display="flex" flexDirection={'column'} gap={2} alignItems="center">

          {lessons?.map((lesson) => (
            <Box sx={{ cursor: 'pointer' }} width={'100%'} key={lesson._id} onClick={() => setSelectedLecture(lesson)}>

              <LessonCard {...lesson} key={lesson._id} />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  )
}

export default LessonPage