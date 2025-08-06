import React from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const lessons = [
  'Introduction to React',
  'JSX & Components',
  'State and Props',
  'Hooks Overview',
];

const faqs = [
  {
    question: 'Do I need prior experience?',
    answer: 'No prior experience required, we start from scratch.',
  },
  {
    question: 'Is the course self-paced?',
    answer: 'Yes, you can learn at your own pace.',
  },
];

const relatedCourses = [
  'Mastering Redux',
  'Next.js Essentials',
  'Full Stack with Node.js',
];

const SingleCourse = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: 'calc(100vw - 265px)',
        pt: 8,
        px: 4,
        bgcolor: '#f5f5f5',
      }}
    >
      {/* 1. Header */}
      <Box display="flex" gap={4} mb={4}>
        <Box>
          <img
            src="/course-thumbnail.jpg"
            alt="course thumbnail"
            style={{
              width: '300px',
              height: '180px',
              objectFit: 'cover',
              borderRadius: '12px',
            }}
          />
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Advanced React for Beginners
          </Typography>
          <Typography color="text.secondary" mb={2}>
            Category: Web Development
          </Typography>
          <Typography mt={2} fontWeight="bold">
            Duration: 5 Hours
          </Typography>
        </Box>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 4 }} />

      {/* 2. About Course */}
      <Typography variant="h5" fontWeight="bold" mb={2}>
        About This Course
      </Typography>
      <Typography mb={4}>
        This course is designed for beginners who want to learn React.js and build modern web apps. You'll
        start from the basics and gradually progress to advanced concepts like state management, routing,
        and performance optimization.
      </Typography>

      {/* 3. Lessons */}
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Course Content
      </Typography>
      <List sx={{ mb: 4 }}>
        {lessons.map((lesson, index) => (
          <ListItem key={index}>
            <ListItemText primary={`Lesson ${index + 1}: ${lesson}`} />
          </ListItem>
        ))}
      </List>

      {/* 4. Instructor */}
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Instructor
      </Typography>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <Avatar src="/instructor.jpg" alt="instructor" sx={{ width: 56, height: 56 }} />
        <Box>
          <Typography fontWeight="bold">Sufiyan Ahmed</Typography>
          <Typography color="text.secondary">Senior Web Developer</Typography>
        </Box>
      </Box>

      {/* 5. Enroll CTA */}
      <Paper
        sx={{
          p: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: '#e3f2fd',
          borderRadius: 2,
          mb: 6,
        }}
      >
        <Typography variant="h6" fontWeight="medium">
          Ready to start this course?
        </Typography>
        <Button variant="contained" size="large" color="primary">
          Enroll Now
        </Button>
      </Paper>

      {/* 6. Reviews */}
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Reviews
      </Typography>
      <Typography mb={2}>⭐️⭐️⭐️⭐️⭐️ 4.9 (120 reviews)</Typography>
      {/* You can add real reviews using cards later */}

      <Divider sx={{ my: 4 }} />

      {/* 7. FAQs */}
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Frequently Asked Questions
      </Typography>
      {faqs.map((faq, idx) => (
        <Accordion key={idx} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="medium">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* 8. Related Courses */}
      <Typography variant="h5" fontWeight="bold" mt={6} mb={2}>
        Related Courses
      </Typography>
      <List>
        {relatedCourses.map((course, index) => (
          <ListItem key={index}>
            <ListItemText primary={course} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SingleCourse;
