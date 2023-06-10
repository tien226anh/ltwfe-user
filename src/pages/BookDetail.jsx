import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Box, Paper, Rating, Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getBookDetail, getBookRate } from '../services/api';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    maxWidth: '1200px',
    margin: '0 auto'
  },
  bookDetails: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  bookImage: {
    marginRight: theme.spacing(2)
  },
  bookInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  averageRate: {
    margin: theme.spacing(2),
    // marginBottom: theme.spacing(2),
  },
  commentList: {
    margin: theme.spacing(2),
    // marginTop: theme.spacing(2),
  },
  commentItem: {
    // marginBottom: theme.spacing(2),
    margin: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  commentAvatar: {
    marginRight: theme.spacing(2),
  },
  userNameRate: {
    display: "flex",
    alignItems: 'center'
  }
}));

const BookDetail = ({ _id }) => {
  const [book, setBook] = useState(null);
  const [averageRate, setAverageRate] = useState(0);
  const [commentRate, setCommentRate] = useState([]);
  const { id } = useParams();
  const classes = useStyles();

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await getBookDetail(id);
        setBook(response.data);
      } catch (error) {
        // Xử lý lỗi khi lấy chi tiết sách
      }
    };

    fetchBookDetail();
  }, [id]);

  useEffect(() => {
    const fetchBookRate = async () => {
      try {
        const response = await getBookRate(id);
        setAverageRate(response.data.average_rate);
        setCommentRate(response.data.comment_rate);
      } catch (error) {
        // Xử lý lỗi khi lấy rating của sách
      }
    };

    fetchBookRate();
  }, [id]);

  return (
    <Box className={classes.root}>
      {book && (
        <Paper elevation={3} style={{ height: '80vh' }}>
          <Box className={classes.bookDetails}>
            <Box className={classes.bookImage}>
              <img src={`http://localhost:8000/${book.cover}`} alt={book.title} />
            </Box>
            <Box className={classes.bookInfo}>
              <Typography variant="h4" component="h2">{book.title}</Typography>
              <Typography variant="subtitle1">Author: {book.author}</Typography>
              <Typography variant="body1">Describe: {book.describe}</Typography>
              <Typography variant="body1">Release Date: {book.release_date}</Typography>
              <Typography variant="body1">Page Number: {book.page_number}</Typography>
              <Typography variant="body1">Price: {book.price}</Typography>
            </Box>
          </Box>
          <Box className={classes.averageRate}>
            <Typography variant="h5" component="h3">Average Rate</Typography>
            <Rating name="average-rate" value={averageRate} readOnly precision={0.5} />
          </Box>
          <Box className={classes.commentList}>
            <Typography variant="h5" component="h3">Comments</Typography>
            {commentRate.map((comment, index) => (
              <Box key={index} className={classes.commentItem}>
                <Avatar className={classes.commentAvatar}>{comment.username.charAt(0)}</Avatar>
                <Box>
                  <div className={classes.userNameRate}>
                    <Typography variant="subtitle1">{comment.username}</Typography>
                    <Rating name={`rate-${index}`} value={comment.rate} readOnly precision={0.5} />
                  </div>
                  <Typography variant="body1">{comment.comment}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default BookDetail;
