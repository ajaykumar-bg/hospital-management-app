import { Container, Grid, Box } from '@mui/material';

export default function ResponsiveGrid() {
  return (
    <Container maxWidth={false} sx={{ px: 2, py: 4 }}>
      <Grid container spacing={2}>
        {[...Array(6)].map((_, index) => (
          <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Box
              sx={{
                bgcolor: 'lightblue',
                height: 150,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
              }}
            >
              Item {index + 1}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
