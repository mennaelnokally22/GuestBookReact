import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { connect } from 'react-redux';

import { onDeleteMessage } from '../Redux/Actions/message';

import { toast } from 'react-toastify';
import MessageForm from '../Components/MessageForm';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const MessageCard = ({
  title,
  body,
  author,
  isSent,
  onDeleteMessage,
  messageId,
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant='outlined'>
      <CardContent>
        <Typography variant='h5' component='h2'>
          {title}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {`${author.firstName} ${author.lastName}`}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {`${author.email}`}
        </Typography>
        <Typography variant='body2' component='p'>
          {body}
        </Typography>
      </CardContent>
      <CardActions>
        {!isSent && (
          <Button
            size='small'
            onClick={() => {
              onDeleteMessage(messageId)
                .then((respone) => toast.success('Deleted Succ!'))
                .catch((err) => toast.error('Something went wrong!'));
            }}
          >
            <DeleteIcon />
          </Button>
        )}

        {isSent && (
          <Button size='small' onClick={() => setOpen(true)}>
            <BorderColorIcon />
          </Button>
        )}
      </CardActions>
      {open && (
        <MessageForm
          isEdit={true}
          isOpen={true}
          onClose={handleClose}
          editingMessage={{ title, body, authorId: author, id: messageId }}
        />
      )}
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onDeleteMessage: (messageId) => dispatch(onDeleteMessage(messageId)),
});
export default connect(null, mapDispatchToProps)(MessageCard);
