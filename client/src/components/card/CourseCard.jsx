import {
  Typography,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';

const CourseCard = ({ title, language, teacherId, thumbnail, _id, lessons }) => {
  return (

    <>
      <Link to={`/course/detail/${_id}`}>
        <Box sx={{ borderRadius: '8px', height: '150px', width: '100%', border: '1px solid #ddd', overflow: 'hidden', display: 'flex', padding: '10px', marginTop: '10px' }}>
          <Box width={'230px'} height={'100%'}>
            <Box component={'img'} src={thumbnail || `https://sr12121.newzenler.com/images/default-course-thumbnail.png`} width={'100%'} height={'100%'} />
          </Box>
          <Box p={2}>
            <Typography fontWeight={'bold'} color='black' fontSize={16}>{title}</Typography>
            <Typography fontSize={16} color='#6e6e6eff' >Created By <span style={{ fontWeight: 'bold', color: '#181818ff' }}> {teacherId?.username || `username`}</span></Typography>
            <Typography color='#6e6e6eff' fontSize={16}>Language: {language}</Typography>
            <Typography color='#6e6e6eff' fontSize={16}>{lessons?.length} {lessons?.length > 1 ? 'Lectures' : 'Lecture'}</Typography>
          </Box>
        </Box>
      </Link>
    </>
  );
};

export default CourseCard;
