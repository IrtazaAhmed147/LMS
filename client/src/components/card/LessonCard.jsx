import {
  Card,
  Typography,
  Box,
} from '@mui/material';
import './card.css'

const LessonCard = ({ contentUrl, title }) => {

  return (
    <Card className='lesson-card'>

      <Box sx={{ width: '120px', height: '100%' }}>
        <Box borderRadius={2} width={'100%'} height={'100%'} component={'img'} src={contentUrl || 'https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png'} />
      </Box>

      <Typography variant="subtitle1" color='white' fontWeight="bold">
        {title}
      </Typography>
    </Card>
  );
};

export default LessonCard;
