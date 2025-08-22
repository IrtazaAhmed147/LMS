import { Card, CardContent, Typography, Box } from '@mui/material';

const StatCard = ({ icon, count, label }) => {
  return (
    <Card sx={{ minWidth: 200, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Box color="primary.main">{icon}</Box>
          <Box>
            <Typography variant="h6" fontWeight="bold">{count}</Typography>
            <Typography color="text.secondary" variant="body2">{label}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
export default StatCard;