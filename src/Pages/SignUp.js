import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { useForm } from 'react-hook-form';
import { string, object } from 'yup';
import { toast } from 'react-toastify';

import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { signUp } from '../Redux/Actions/auth';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        fontWeight: 'bold',
        margin: '10px',
        '&:hover': {
          backgroundColor: 'green',
        },
      },
      containedPrimary: {
        backgroundColor: '#3498db',
      },
    },
    MuiFormLabel: {
      root: {
        color: 'darkgray',
      },
    },
    MuiInputBase: {
      input: {
        color: 'darkgray',
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: theme.palette.info.main,
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
  main: {
    paddingTop: '100px',
    paddingBottom: '100px',
  },
  heading: {
    color: 'darkgray',
  },
}));

const schema = object().shape({
  firstName: string().required('First Name is required!'),
  lastName: string().required('Last Name is required!'),
  email: string()
    .lowercase()
    .email('Invalid email address!')
    .required('Email is required!'),
  password: string()
    .min(6, 'Password needs to be at least 6 characters!')
    .required('Password is required!'),
});

const SignUp = ({ history, signUp }) => {
  const classes = useStyles();

  const { register, handleSubmit, errors, formState } = useForm({
    validationSchema: schema,
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    console.log(data);
    signUp({ ...data })
      .then((data) => {
        toast.success(`Signed up Successfully , Go and sign in now`);
        history.replace('/sign-in');
      })
      .catch((err) => {
        toast.error(`Seems that this email is already registered!`);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs' className={classes.main}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5' className={classes.heading}>
            Sign up
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name='firstName'
                  variant='standard'
                  fullWidth
                  id='firstName'
                  label='First Name'
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='standard'
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='standard'
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='standard'
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  inputRef={register}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              disabled={formState.isSubmitting}
            >
              Sign Up
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link to='/sign-in' className={classes.link}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUp: (user) => dispatch(signUp(user)),
});

export default connect(null, mapDispatchToProps)(SignUp);
