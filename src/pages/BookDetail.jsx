import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Typography,
  Box,
  Paper,
  Rating,
  Avatar,
  Button,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { addToCart, getBookDetail, getBookRate, rateBook } from "../services/api";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    maxWidth: "1200px",
    margin: "0 auto",
  },
  bookDetails: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  bookImage: {
    marginRight: theme.spacing(2),
  },
  bookInfo: {
    display: "flex",
    flexDirection: "column",
  },
  averageRate: {
    margin: theme.spacing(2),
    textAlign: "center", // Center align the average rate
  },
  commentList: {
    margin: theme.spacing(2),
  },
  commentItem: {
    margin: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  commentAvatar: {
    marginRight: theme.spacing(2),
  },
  userNameRate: {
    display: "flex",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center", // Center align the button and TextField
    marginBottom: theme.spacing(2),
  },
  commentForm: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(2),
  },
}));

const BookDetail = () => {
  const [book, setBook] = useState(null);
  const [averageRate, setAverageRate] = useState(0);
  const [commentRate, setCommentRate] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [commentValue, setCommentValue] = useState("");
  const [selectedRate, setSelectedRate] = useState(0);

  const { id } = useParams();
  const classes = useStyles();

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleAddToCart = () => {
    const book_id = id;
    const booksnum = quantity;
    const obj = { book_id, booksnum };
    addToCart(obj)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCommentChange = (event) => {
    setCommentValue(event.target.value);
  };

  const handleCommentRateChange = (event, value) => {
    setSelectedRate(value);
  };

  const handleCommentSubmit = () => {
    const params = {
      comment: commentValue,
      rate: selectedRate,
    };

    rateBook(id, params)
      .then((response) => {
        console.log(response.data);
        setCommentValue("");
        setSelectedRate(0);
        fetchBookRate();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await getBookDetail(id);
        setBook(response.data);
      } catch (error) {
        console.error(error);
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
        console.error(error);
      }
    };

    fetchBookRate();
  }, [id]);

  return (
    <Box className={classes.root}>
      {book && (
        <Paper elevation={3} style={{ height: "80vh" }}>
          <Box className={classes.bookDetails}>
            <Box className={classes.bookImage}>
              <img
                src={`http://localhost:8000/${book.cover}`}
                alt={book.title}
              />
            </Box>
            <Box className={classes.bookInfo}>
              <Typography variant="h4" component="h2">
                {book.title}
              </Typography>
              <Typography variant="subtitle1">Author: {book.author}</Typography>
              <Typography variant="body1">Describe: {book.describe}</Typography>
              <Typography variant="body1">
                Release Date: {book.release_date}
              </Typography>
              <Typography variant="body1">
                Page Number: {book.page_number}
              </Typography>
              <Typography variant="body1">Price: {book.price}</Typography>
            </Box>
          </Box>
          <div className={classes.buttonContainer}>
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleQuantityChange}
            />
            <Button variant="contained" onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </Button>
          </div>
          <Box className={classes.averageRate}>
            <Typography variant="h5" component="h3">
              Average Rate
            </Typography>
            <Rating
              name="average-rate"
              value={averageRate}
              readOnly
              precision={0.5}
            />
          </Box>
          <Box className={classes.commentList}>
            <Typography variant="h5" component="h3">
              Comments
            </Typography>
            <Box className={classes.commentForm}>
              <Rating
                name="comment-rate"
                value={selectedRate}
                onChange={handleCommentRateChange}
                precision={0.5}
                style={{ margin: "0 auto" }}
              />
              <TextField
                label="Your Comment"
                variant="outlined"
                value={commentValue}
                onChange={handleCommentChange}
                multiline
                rows={4}
                margin="normal"
              />
              <Button variant="contained" onClick={handleCommentSubmit}>
                Submit Comment
              </Button>
            </Box>
            {commentRate.map((comment, index) => (
              <Box key={index} className={classes.commentItem}>
                <Avatar className={classes.commentAvatar}>
                  {comment.username.charAt(0)}
                </Avatar>
                <Box>
                  <div className={classes.userNameRate}>
                    <Typography variant="subtitle1">
                      {comment.username}
                    </Typography>
                    <Rating
                      name={`rate-${index}`}
                      value={comment.rate}
                      readOnly
                      precision={0.5}
                    />
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
