import {
  Typography,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';

const FeatureCard = ({ title, teacherId, thumbnail, _id, }) => {

  return (
    <>
      <Box sx={{ margin: { sm: 'auto', md: 'initial', xs: 'auto' }, borderRadius: '8px', height: '250px', width: '330px', border: '1px solid #ddd', overflow: 'hidden' }}>
        <Link to={`/course/detail/${_id}`} style={{ color: '#000' }}>
          <Box width={'100%'} height={'70%'}>
            <Box component={'img'} src={thumbnail} width={'100%'} height={'100%'} />
          </Box>
          <Box p={2}>
            <Typography fontWeight={'bold'} fontSize={16}>{title}</Typography>
            <Typography fontWeight={'bold'} fontSize={16} color='#4d4d4dff'>{teacherId?.username}</Typography>
          </Box>
        </Link>
      </Box>
    </>
  );
};

export default FeatureCard;
