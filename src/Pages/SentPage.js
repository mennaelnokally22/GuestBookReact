import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';

import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

import { fetchSentMessages } from '../Redux/Actions/message';
import { Container } from '@material-ui/core';
import Navbar from '../Components/Navbar';
import MessageCard from '../Components/MessageCard';

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
const SentMessages = ({ messages, auth, history, fetchSentMessages }) => {
  useEffect(() => {
    (async () => {
      const data = await fetchSentMessages();
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
              author={message.authorId}
              isSent={true}
              messageId={message._id}
            />
          ))}
        </Container>
      </div>
    </ThemeProvider>
  );
};

const mapSatateToProps = (state) => ({
  messages: state.messages,
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  fetchSentMessages: () => dispatch(fetchSentMessages()),
});
export default connect(mapSatateToProps, mapDispatchToProps)(SentMessages);
