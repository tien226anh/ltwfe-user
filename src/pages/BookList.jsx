import React, { useEffect, useState } from 'react';
import { getBooks } from '../services/api';
import { Grid, Card, CardContent, CardMedia, Typography, CssBaseline, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: theme.spacing(2),
  },
  hoveredCard: {
    transform: 'scale(1.05)',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.2)',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '100%',
  },
  cardContent: {
    flexGrow: 1,
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
}));

const BookList = () => {
  const classes = useStyles();
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [skip, setSkip] = useState(1);
  const [limit, setLimit] = useState(16);
  const [totalRecord, setTotalRecord] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks({ title, author, category, skip, limit });
        setBooks(response.data.result);
        setTotalRecord(response.data.total_record);
      } catch (error) {
        // Handle error when fetching book list
      }
    };

    fetchBooks();
  }, [title, author, category, skip, limit]);

  const totalPages = Math.ceil(totalRecord / pageSize);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSkip(skip - limit);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setSkip(currentPage + 1);
    }
  };

  return (
    <>
      <CssBaseline />
      <Grid container spacing={2} className={classes.gridContainer}>
        {books.map((book) => {
          // console.log(book._id);
          return (
            <Grid item xs={12} sm={6} md={3} key={book._id}>
              <Link to={`/books/${book._id}`}>
                <Card
                  className={`${classes.card} ${hoveredCard === book._id ? classes.hoveredCard : ''}`}
                  onMouseEnter={() => setHoveredCard(book._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardMedia
                    className={classes.cardMedia}
                    image={`http://127.0.0.1:8000/${book.cover}`}
                    title={book.title}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {book.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Author: {book.author}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Price: {book.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>
      <div className={classes.paginationContainer}>
        <Button disabled={currentPage === 1} onClick={handlePreviousPage}>
          Previous
        </Button>
        <Typography variant="h6" color="textSecondary" component="p">
          Page {currentPage} of {totalPages}
        </Typography>
        <Button disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next
        </Button>
      </div>
    </>
  );
};

export default BookList;
