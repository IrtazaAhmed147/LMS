import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  CardActions
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const LessonCard = () => {
  const lesson = {
    title: 'Excel Basics',
    contentType: 'video',
    contentUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '15 mins',
  };

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
    <Card sx={{ width: 300, borderRadius: 2, boxShadow: 4 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Chip
            label={lesson.contentType.toUpperCase()}
            color="primary"
            size="small"
            icon={getIcon()}
          />
          <Typography variant="caption" color="text.secondary">
            {lesson.duration}
          </Typography>
        </Box>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {lesson.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          size="small"
          fullWidth
          href={lesson.contentUrl}
          target="_blank"
        >
          {lesson.contentType === 'video' ? 'Watch' : 'Open'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default LessonCard;
