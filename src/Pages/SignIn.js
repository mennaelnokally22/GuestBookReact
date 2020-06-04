import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { useForm } from 'react-hook-form';
import { string, object } from 'yup';
import { toast } from 'react-toastify';

import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { signIn } from '../Redux/Actions/auth';

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
  email: string()
    .lowercase()
    .email('Invalid email address!')
    .required('Email is required!'),
  password: string()
    .min(6, 'Password needs to be at least 6 characters!')
    .required('Password is required!'),
});

const SignIn = ({ history, signIn }) => {
  const classesNames = useStyles();

  const { register, handleSubmit, errors, formState } = useForm({
    validationSchema: schema,
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    console.log(data);
    signIn({ ...data })
      .then((data) => {
        toast.success(`Welcome`);
        history.replace('/home');
      })
      .catch((err) => {
        toast.error(`Invalid email or password`);
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs' className={classesNames.main}>
        <div className={classesNames.paper}>
          <Avatar className={classesNames.avatar}>
            <LockOpenIcon />
          </Avatar>
          <Typography
            component='h1'
            variant='h4'
            className={classesNames.heading}
          >
            Sign in
          </Typography>
          <form
            className={classesNames.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Grid container spacing={2}>
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
              className={classesNames.submit}
              disabled={formState.isSubmitting}
            >
              Sign In
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link to='/' className={classesNames.link}>
                  Don't have an account? Sign up
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
  signIn: (data) => dispatch(signIn(data)),
});

export default connect(null, mapDispatchToProps)(SignIn);
