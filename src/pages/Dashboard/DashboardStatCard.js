import { Box, Card, CardContent, Typography } from '@mui/material';

const DashboardStatCard = ({ title, value, icon, color = 'primary' }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Box>
          <Typography color='textSecondary' gutterBottom variant='h6'>
            {title}
          </Typography>
          <Typography variant='h4' component='div'>
            {value}
          </Typography>
        </Box>
        <Box sx={{ color: `${color}.main` }}>{icon}</Box>
      </Box>
    </CardContent>
  </Card>
);

export default DashboardStatCard;
