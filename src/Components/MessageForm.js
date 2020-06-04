import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { ThemeProvider } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { onAddMessage, onEditMessage } from '../Redux/Actions/message';

const MessageSchema = object().shape({
  email: string().required('Email is required').email(),
  title: string().required('Message title is required!'),
  body: string()
    .min(20, 'Body needs to be at least 20 characters!')
    .required('Body is required!'),
});

const useStyles = makeStyles((theme) => ({
  addBtn: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
  },
  submitBtn: {
    display: 'block',
    marginLeft: 'auto',
    marginTop: '16px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    // backgroundColor: '#212121',
    // color: 'rgba(255, 255, 255, 0.7)',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  w: {
    width: '50%',
  },
}));

const MessageForm = ({
  isOpen,
  editingMessage,
  onClose,
  onEditMessage,
  isEdit,
  onAddMessage,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(isOpen);
  const { handleSubmit, register, errors } = useForm({
    validationSchema: MessageSchema,
    mode: 'onBlur',
  });
  const onSubmit = (data) => {
    if (isEdit) {
      console.log(data);
      onEditMessage(editingMessage.id, { ...data })
        .then((response) => {
          toast.success(`Message ${data.title} Updated successfully!`);
          handleClose();
        })
        .catch((err) => {
          toast.error(`Something went wrong!`);
        });
    } else {
      console.log(data);
      onAddMessage({ ...data })
        .then((response) => {
          toast.success(`Message ${data.title} Sent successfully!`);
          handleClose();
        })
        .catch((err) => {
          toast.error(`Invalid User Email!`);
        });
    }
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  return (
    <Box m={4} p={4} className={classes.w}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          {isEdit ? 'Edit Message' : 'Add Message'}
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              id='title'
              name='title'
              label='Blog Title'
              type='text'
              defaultValue={isEdit ? editingMessage.title : ''}
              fullWidth
              margin='normal'
              error={!!errors.title}
              helperText={errors.title?.message}
              inputRef={register}
            />
            <TextField
              id='body'
              name='body'
              label='Blog Body'
              defaultValue={isEdit ? editingMessage.body : ''}
              multiline
              rows='4'
              fullWidth
              margin='normal'
              error={!!errors.body}
              helperText={errors.body?.message}
              inputRef={register}
            />
            {!isEdit && (
              <TextField
                id='email'
                name='email'
                label='User Email'
                type='text'
                fullWidth
                margin='normal'
                inputRef={register}
              />
            )}
            <Button
              type='submit'
              color='secondary'
              variant='contained'
              className={classes.submitBtn}
            >
              {isEdit ? 'Save' : 'Add'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onEditMessage: (messageId, updates) =>
    dispatch(onEditMessage(messageId, updates)),
  onAddMessage: (message) => dispatch(onAddMessage(message)),
});

export default connect(null, mapDispatchToProps)(MessageForm);
