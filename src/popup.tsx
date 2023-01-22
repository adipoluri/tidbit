import { useEffect, useState } from "react"
import {
  GoogleAuthProvider,
  User,
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithCredential
} from "firebase/auth"

import AutorenewIcon from '@mui/icons-material/Autorenew';
import {Configuration, OpenAIApi} from "openai";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Stack, Container, Divider, ThemeProvider, Tabs, Tab } from "@mui/material";
import { AccountTree, ChromeReaderMode, Padding } from "@mui/icons-material";
import {AiFillQuestionCircle, AiFillPicture, AiOutlineCheck, AiFillWechat} from 'react-icons/ai';
import {BiMeh} from 'react-icons/bi';
import { AwesomeButton, AwesomeButtonProgress } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import styles from 'react-awesome-button/src/styles/themes/theme-c137';

// This is the firebase.ts file we created a few
// steps ago when we received our config!
import { auth } from "./firebase"
import AISelector from "./components/AISelector/aiselector";
import InputField from "./components/InputField/inputfield"
import LoadingScreen from "./components/misc/loader";
import LogoButton from "./components/misc/logobutton";
import {theme} from "./config"

// We'll need to specify that we want Firebase to store
// our credentials in localStorage rather than in-memory
setPersistence(auth, browserLocalPersistence)

function IndexPopup() {
  
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User>(null)

  // Whenever the user clicks logout, we need to 
  // use the auth object we imported from our firebase.ts
  // file and sign them out!
  const onLogoutClicked = async () => {
    if (user) {
      await auth.signOut()
    }
  }

  // When the user clicks log in, we need to ask Chrome
  // to log them in, get their Google auth token, 
  // send it to Firebase, and let Firebase do its magic
  // if everything worked, we'll get a user object from them
  const onLoginClicked = () => {
    chrome.identity.getAuthToken({ interactive: true }, async function (token) {
      if (chrome.runtime.lastError || !token) {
        console.error(chrome.runtime.lastError)
        setIsLoading(false)
        return
      }
      if (token) {
        const credential = GoogleAuthProvider.credential(null, token)
        try {
          // There's no need to do anything with what this returns
          // since we're keeping track of the user object with
          // onAuthStateChanged
          await signInWithCredential(auth, credential)
        } catch (e) {
          console.error("Could not log in. ", e)
        }
      }
    })
  }

  // We register this listener once when this component starts
  useEffect(() => {
    // Whenever the auth changes, we make sure we're no longer loading
    // and set the user! On login, this will populate with a new user
    // on logout, this will make user null
    onAuthStateChanged(auth, (user) => {
      setIsLoading(false)
      setUser(user)
    })
  }, [])

  if(isLoading) {
    return (
      <LoadingScreen/>
    )
  }
  
  return (
    <>
      {!user ? (
        <Container>
          <Box>
            <AwesomeButton cssModule={styles} size="medium"
              onPress={() => {
                setIsLoading(true)
                onLoginClicked()
              }}>
              Log in
            </AwesomeButton>
          </Box>
        </Container>
        ) : (
        <ThemeProvider theme={theme}>
          <Container style={{backgroundColor:"#36393e"}}>
            <Grid2 container wrap="nowrap" spacing={6}>
              <Grid2 style={{backgroundColor:"#282b30",}}>
                <Stack spacing={1}>
                  <LogoButton/>
                  <AISelector/>
                  <Divider style={{backgroundColor:"#3c54aa"}}/>
                  <AwesomeButton cssModule={styles} type="danger">
                    <AiFillWechat size={"1.5em"}/>
                  </AwesomeButton>
                  <AwesomeButton 
                  cssModule={styles} 
                    onPress={() => {
                        setIsLoading(true)
                        onLogoutClicked()
                      }}>
                    <img src={user.photoURL} style={{width:"30px",height:"30px",borderRadius:"25px"}}/>
                  </AwesomeButton>
                </Stack>
              </Grid2>
              <Grid2 style={{backgroundColor:"#36393e"}}>
                <InputField/>
              </Grid2>
            </Grid2>
          </Container>
        </ThemeProvider>
      )}
    </>
  )
}

export default IndexPopup





/*
          <div>
            {!!user ? (
              <div>
                Hey {user.displayName}! Welcome to 🍩 TidBit! 
              </div>
            ) : (
              ""
            )}
          </div>

    <button onClick={() => {
            setIsLoading(true)
            onLogoutClicked()
          }}>
            Log out
          </button>
*/