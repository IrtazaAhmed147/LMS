import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  CardActions,
  Divider,
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const LessonCard = ({contentUrl,title}) => {


  const getIcon = () => {
    switch (lesson.contentType.toLowerCase()) {
      case 'video':
        return <PlayCircleOutlineIcon />;
      case 'pdf':
        return <PictureAsPdfIcon />;
      default:
        return null;
    }
  };

  return (
    <Card
      sx={{
        display:'flex',
        gap:1,
        height:100,
        backgroundColor:'#161722ff',
        padding:'10px',
        width: '100%',
        borderRadius: 3,
        boxShadow: 5,
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 8,
        },
        position: 'relative',
      }}
    >
    

    
        <Box sx={{width:'120px' , height:'100%'}}>
            <Box borderRadius={2} width={'100%'} height={'100%'} component={'img'} src={contentUrl || 'https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png'}/>
        </Box>

        <Typography variant="subtitle1" color='white' fontWeight="bold">
          {title}
        </Typography>
    

      
      
    </Card>
  );
};

export default LessonCard;
