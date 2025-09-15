import { useState } from "react";
import Rating from "@mui/material/Rating";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Avatar,
  Grid,
  TextField,
  Button
} from "@mui/material";

const reviews = [
  {
    name: "Kritika Sharma",
    date: "01/03/1993",
    avatar: "https://i.pravatar.cc/150?img=1",
    content:
      "Noodles & Company is an American fast-casual restaurant that offers international and American noodle dishes and pasta in addition to soups and salads.",
    rating: 5
  },
  {
    name: "Kritika Sharma",
    date: "02/11/1995",
    avatar: "https://i.pravatar.cc/150?img=2",
    content: "Great experience, but could be improved.",
    rating: 4
  }
];

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <Typography sx={{ p: 2 }}>
            Lorem Ipsum is simply dummy text used in the printing and typesetting industry.
          </Typography>
        );
      case 1:
        return (
          <Box sx={{ p: 2 }}>
            <Table component={Paper} sx={{ minWidth: 300 }}>
              <TableBody>
                <TableRow>
                  <TableCell>Stand Up</TableCell>
                  <TableCell>35”L x 24”W x 37-45”H</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Weight Capacity</TableCell>
                  <TableCell>60 LBS</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Frame</TableCell>
                  <TableCell>Aluminum</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        );
      case 2:
        return (
          <Grid container spacing={4} justifyContent="center" sx={{ p: 2 }}>
            <Grid item xs={12}>
              {reviews.map((review, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    mb: 3,
                    bgcolor: "#f9f9f9",
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 1
                  }}
                >
                  <Avatar src={review.avatar} sx={{ width: 56, height: 56, mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle2">{review.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {review.date}
                    </Typography>
                    <Rating value={review.rating} readOnly size="small" sx={{ mt: 0.5 }} />
                    <Typography variant="body2" sx={{ mt: 1 }}>{review.content}</Typography>
                  </Box>
                </Box>
              ))}
              <Box sx={{ mt: 4, p: 2, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
                <Typography variant="h6" gutterBottom>Write a Review</Typography>
                <TextField fullWidth multiline rows={4} placeholder="Share your thoughts..." variant="outlined" sx={{ mb: 2 }} />
                <Button variant="contained" color="primary">Submit Review</Button>
              </Box>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        width: '90%',
        mx: 'auto',
        mt: 4,
        bgcolor: 'rgba(193, 197, 198, 0.2)',
        borderRadius: 2,
        boxShadow: 1,
        p: 2
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        sx={{ mb: 2 }}
      >
        <Tab label="Description" sx={{ mx: 2 }} />
        <Tab label="Additional Info" sx={{ mx: 2 }} />
        <Tab label="Reviews (11)" sx={{ mx: 2 }} />
      </Tabs>
      {renderTabContent()}
    </Box>
  );
};

export default ProductTabs;
