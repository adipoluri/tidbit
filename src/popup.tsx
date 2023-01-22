import { useEffect, useState } from "react"
import {
  GoogleAuthProvider,
  User,
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithCredential
} from "firebase/auth"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Stack, Container, Divider, ThemeProvider, Paper, Button } from "@mui/material";
import 'react-awesome-button/dist/styles.css';
import {AiFillPicture, AiOutlineFileText,AiFillWechat} from 'react-icons/ai';
import {VscQuestion} from 'react-icons/vsc'
import {FaHandHoldingHeart,FaRegFileCode} from "react-icons/fa"
import {SlSpeech} from "react-icons/sl"
import {SiRobotframework} from "react-icons/Si"
import {FiHeart} from "react-icons/fi"
import LoadingScreen from "./components/misc/loader";
import LogoButton from "./components/misc/logobutton";
import {Configuration, OpenAIApi} from "openai";
import { TextField } from "@mui/material";
import { AwesomeButton, AwesomeButtonProgress } from 'react-awesome-button';
import styles from 'react-awesome-button/src/styles/themes/theme-c137';
import { collection, addDoc} from "firebase/firestore";
import {db,auth} from './firebase';
import {theme,prompts} from "./config"

setPersistence(auth, browserLocalPersistence)

function IndexPopup() {
  console.log(prompts)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User>(null)
  const [currAi, setAI] = useState(0)
  
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

  function AISelector() {
  
    return (
      <>
        <Stack spacing={0.4} direction="column" justifyContent="flex-start" alignItems="center">
  
          <AwesomeButton cssModule={styles}  onPress= {() => {setAI(0)}}>
            <VscQuestion size={"1.5em"} title="Brainiac Mode"/>
          </AwesomeButton>
  
          <AwesomeButton cssModule={styles} onPress= {() => {setAI(1)}}>
            <AiOutlineFileText size={"1.5em"} title="Summarizer"/>
          </AwesomeButton>
  
          <AwesomeButton cssModule={styles} onPress= {() => {setAI(2)}}>
            <FaRegFileCode size={"1.5em"} title="Code Analyzer"/>
          </AwesomeButton>
  
          <AwesomeButton cssModule={styles} onPress= {() => {setAI(3)}}>
            <FaHandHoldingHeart size={"1.5em"} title="Sentiment Analyzer"/>
          </AwesomeButton>
  
          <AwesomeButton cssModule={styles} onPress= {() => {setAI(4)}}>
            <SlSpeech size={"1.5em"} title="The TidBit Assistant"/>
          </AwesomeButton>
          
          <AwesomeButton cssModule={styles} onPress= {() => {setAI(5)}}>
            <SiRobotframework size={"1.5em"} title="H4RV The Comedy Bot"/>
          </AwesomeButton>
  
          <AwesomeButton cssModule={styles} onPress= {() => {setAI(6)}}>
            <AiFillPicture size={"1.5em"} title="Imagifier"/>
          </AwesomeButton>
          
        </Stack>
      </>
    )
  }
  
  function InputField() {  
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [im, setImage] = useState("");

    const configuration = new Configuration({
        apiKey: process.env.OPEN_AI_KEY
    });

    const openapi = new OpenAIApi(configuration);

    useEffect(()=>{
        console.log("Store Data")
    }, []);

    async function handleSubmit(releaseCallback) {
        setImage("")
        try{
            if(currAi==6) {
                const response = await openapi.createImage({
                  prompt: prompt,
                  n: 1,
                  size: "256x256",
                });
                setImage(response.data.data[0].url);
                console.log("Printed Image")
            } else {
                const completion = await openapi.createCompletion({
                    model: prompts[currAi]["model"],
                    prompt: prompts[currAi]["prompt_header"]+prompt,
                    max_tokens: prompts[currAi]["max_tokens"],
                    temperature:prompts[currAi]["temperature"],
                    top_p:prompts[currAi]["top_p"],
                    frequency_penalty:prompts[currAi]["frequency_penalty"],
                    presence_penalty:prompts[currAi]["prescence_penalty"],
                    stop:prompts[currAi]["stops"],
                });
                setResponse(completion.data.choices[0].text);
                const docRef = await addDoc(collection(db, "queries"), {
                    use:user.uid,
                    prompt: prompt,
                    answer:completion.data.choices[0].text
                });
                console.log("Document written with ID: ", docRef.id);
            }
        }catch (e){
            console.log(e)
            alert("Error");
        }
        releaseCallback();
    }

    return (
        <>
            <TextField
                autoFocus
                color="secondary"
                style = {{width: 350}}
                label="Put your tidbit inquiry here..."
                variant="outlined"
                multiline
                rows={4}
                margin="normal"
                inputProps={{style: {fontSize: 14,color:"#D4D8E3",fontFamily: 'Trebuchet MS'}}} // font size of input text
                InputLabelProps={{style: {fontSize: 14, color: "#7289da",fontFamily: 'Trebuchet MS'}}} // font size of input label
                value={prompt}
                onChange={(e) =>{
                    setPrompt(e.target.value)
                }}
            />
            <Stack direction={"row"} justifyContent={"space-between"}>
              <AwesomeButtonProgress 
                  type="primary"
                  size="medium"
                  loadingLabel="Thinking..."
                  resultLabel="Got it!"
                  onPress= {(event,release) => {handleSubmit(release)}}
                  cssModule={styles}
              >
                  Submit
              </AwesomeButtonProgress>
              <AwesomeButtonProgress 
                type="primary"
                size="small"
                loadingLabel="Liking..."
                resultLabel="Liked!"
                onPress= {(event,release) => {handleSubmit(release)}}
                cssModule={styles}
            >
                <FiHeart title="Like"/>
            </AwesomeButtonProgress>
            </Stack>
            <Paper
                elevation={24}
                sx={{p:3}}
                style={{marginTop:"1em",marginBottom:"1em", minHeight:"80px",maxWidth:300, backgroundColor:"#424549", color:"#D4D8E3", fontSize:"18"}}
            >
                {response}
                {im != "" ? <img src={im} style={{width:"256px",height:"256px",borderRadius:"12px"}}/>: ""}
            </Paper>
        </>
    )
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
              <Grid2 style={{backgroundColor:"#282b30"}}>
                <Stack spacing={1}>
                  <LogoButton/>
                  <AISelector/>
                  <Divider style={{backgroundColor:"#3c54aa"}}/>
                  <AwesomeButton cssModule={styles} type="danger">
                    <AiFillWechat size={"1.5em"} title=""/>
                  </AwesomeButton>
                  <Stack direction="column" justifyContent="space-around" alignItems="center">
                    <AwesomeButton
                    moveEvents={true}
                    cssModule={styles} 
                    size="icon"
                      onPress={() => {
                          setIsLoading(true)
                          onLogoutClicked()
                        }}>
                      <img src={user.photoURL} style={{width:"30px",height:"30px",borderRadius:"25px"}} title="Log Out"/>
                    </AwesomeButton>
                  </Stack>
                </Stack>
              </Grid2>
              <Grid2 style={{backgroundColor:"#36393e"}}>
                <Stack   direction="row" justifyContent="center" alignItems="center">
                  <Button variant="outlined" color="text" disableRipple={true}>
                    {prompts[currAi]["type"]}
                  </Button>
                </Stack>
                <InputField/>

              </Grid2>
            </Grid2>
          </Container>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" style={{color:"#D4D8E3",fontSize:"10px"}}>
                  🍩 TidBit made with love by Adi Poluri and Jayden Cang
                </Stack>
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