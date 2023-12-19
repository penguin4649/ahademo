import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import grImg from '../icon/gr.svg'
import blImg from '../icon/bl.svg'

// TODO remove, this demo shouldn't need to reset the theme.


const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': 'grey',
            '--TextField-brandBorderHoverColor': '#B2BAC2',
            '--TextField-brandBorderFocusedColor': 'white',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--TextField-brandBorderColor)',
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'white',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'primary',
            },
          },
        },
      },
    },
  });

export default function Password() {
  const [password, setPassword] = React.useState("")
  const [modalSwitch, setModalSwitch] = React.useState(true);

  const [hasUppercase, setHasUppercase] = React.useState(false);
  const [hasLowercase, setHasLowercase] = React.useState(false);
  const [hasNumber, setHasNumber] = React.useState(false);
  const [hasSpecialChar, setHasSpecialChar] = React.useState(false);
  const [isLengthValid, setIsLengthValid] = React.useState(false);

  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /\d/;
  const specialCharRegex = /[!@#&$%^*()_+{}\[\]:;<>,.?~\\-]/;
  const minLength = 8;

  const changePasswordhandler = (e) => {

    setPassword(e.target.value)
  }

  const handleFocus = () => {
    setModalSwitch(true);
  };
  const handleBlur = () => {
    setModalSwitch(false);
  };

  React.useEffect(() => {
    setHasUppercase(uppercaseRegex.test(password));
    setHasLowercase(lowercaseRegex.test(password));
    setHasNumber(numberRegex.test(password));
    setHasSpecialChar(specialCharRegex.test(password));
    setIsLengthValid(password.length >= minLength);
  }, [password])

  const outerTheme = useTheme();

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate sx={{ mt: 1, width: 335 ,position: 'relative'}}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={changePasswordhandler}
              autoComplete="current-password"
              placeholder='Password'
              onFocus={handleFocus}
              onBlur={handleBlur}
              sx={{
                borderWidth: "2px",
                '& fieldset': { borderColor: 'grey', borderWidth: "2px" },
                input: { color: 'white' }
              }}
              InputLabelProps={{ shrink: true, style: { color: '#fff'}}}
            />
            {modalSwitch && (
              <List sx={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                left: 0,
                borderRadius: '8px',
                backgroundColor: '#242424',
                zIndex:1,
                minWidth:'335px'
              }}>
                <ListItem>
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar src={hasUppercase ? blImg : grImg} sx={{ width: 20, height: 20 }}>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontSize: '14px', textAlign: 'left' }}>
                        Havd at least one uppercase letter
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar src={hasLowercase ? blImg : grImg} sx={{ width: 20, height: 20 }}>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontSize: '14px', textAlign: 'left' }}>
                        Havd at least one lowercase letter
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar src={hasNumber ? blImg : grImg} sx={{ width: 20, height: 20 }}>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontSize: '14px', textAlign: 'left' }}>
                        Havd at least one number
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar src={hasSpecialChar ? blImg : grImg} sx={{ width: 20, height: 20 }}>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontSize: '14px', textAlign: 'left' }}>
                        Havd at least one special character<br />(!@#&...etc)
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar src={isLengthValid ? blImg : grImg} sx={{ width: 20, height: 20 }}>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontSize: '14px', textAlign: 'left' }}>
                        Longer than 8 characters
                      </Typography>
                    }
                  />
                </ListItem>

              </List>
            )}
          </Box>
        </Box>
        <Box></Box>
      </Container>
    </ThemeProvider>
  );
}