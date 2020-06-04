import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

import { fetchMessages } from '../Redux/Actions/message';
import { Container } from '@material-ui/core';
import Navbar from '../Components/Navbar';
import MessageCard from '../Components/MessageCard';
import MessageForm from '../Components/MessageForm';

const theme = createMuiTheme({
  overrides: {
    MuiPaginationItem: {
      page: {
        color: 'white',
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
  },
  col: {
    backgroundColor: theme.palette.info.main,
  },
  fab: {
    position: 'fixed',
    bottom: '0',
    right: '0',
  },
}));
const Home = ({ messages, auth, history, fetchMessages }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    (async () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const data = await fetchMessages();
    })();
  }, []);

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar history={history} />
        {messages.length === 0 && (
          <Container className={classes.root}>
            <CircularProgress color='secondary' />
          </Container>
        )}
        <Container>
          {messages.map((message) => (
            <MessageCard
              key={message._id}
              title={message.title}
              body={message.body}
              messageId={message._id}
              author={message.authorId}
              isSent={false}
            />
          ))}
        </Container>
        <Fab
          color='primary'
          aria-label='add'
          className={classes.fab}
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Fab>
        {open && (
          <MessageForm isEdit={false} isOpen={true} onClose={handleClose} />
        )}
      </div>
    </ThemeProvider>
  );
};

const mapSatateToProps = (state) => ({
  messages: state.messages,
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  fetchMessages: () => dispatch(fetchMessages()),
});
export default connect(mapSatateToProps, mapDispatchToProps)(Home);
