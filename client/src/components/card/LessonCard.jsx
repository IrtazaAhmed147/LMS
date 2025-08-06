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
    <Card
      sx={{
        width: 320,
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
      {/* Top colored border */}
      <Box
        sx={{
          height: 6,
          background:
            lesson.contentType === 'video'
              ? 'linear-gradient(to right, #2196f3, #21cbf3)'
              : 'linear-gradient(to right, #ff6f00, #ff8f00)',
        }}
      />

      <CardContent sx={{ backgroundColor: '#f8f9fa' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Chip
            label={lesson.contentType.toUpperCase()}
            color={lesson.contentType === 'video' ? 'primary' : 'warning'}
            size="small"
            icon={getIcon()}
          />
          <Typography variant="caption" color="text.secondary">
            ⏱ {lesson.duration}
          </Typography>
        </Box>

        <Typography variant="subtitle1" fontWeight="bold">
          {lesson.title}
        </Typography>
      </CardContent>

      <Divider />

      <CardActions sx={{ px: 2, py: 1.5, backgroundColor: '#ffffff' }}>
        <Button
          variant="contained"
          fullWidth
          color={lesson.contentType === 'video' ? 'primary' : 'warning'}
          href={lesson.contentUrl}
          target="_blank"
        >
          {lesson.contentType === 'video' ? 'Watch Lesson' : 'Open File'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default LessonCard;
