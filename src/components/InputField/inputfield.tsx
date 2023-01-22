import { useEffect, useState } from "react"
import {Configuration, OpenAIApi} from "openai";
import { TextField, Paper } from "@mui/material";
import { AwesomeButton, AwesomeButtonProgress } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

function InputField() {  
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
  });

  const openapi = new OpenAIApi(configuration);

  useEffect(()=>{
    console.log("Store Data")
  }, []);

  async function handleSubmit(releaseCallback) {
    try{
      const completion = await openapi.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 100,
      });
      setResponse(completion.data.choices[0].text);
    }catch (e){
      alert("Error");
    }
    releaseCallback();
  }

  return (
    <>
        <TextField
            autoFocus
            style = {{width: 300}}
            label="Put your tidbit inquiry here..."
            variant="outlined"
            multiline
            rows={4}
            margin="normal"
            value={prompt}
            onChange={(e) =>{
                setPrompt(e.target.value)
                //chrome.storage.local.set({prompt: e.target.value});
            }}
        />
        <AwesomeButtonProgress
            type="primary"
            size="medium"
            onPress= {(event,release) => {handleSubmit(release)}}
        >
            Submit
        </AwesomeButtonProgress>
        <Paper
            sx={{p:3}}
        >
            {response}
        </Paper>
  </>
  )
}

export default InputField

/*
    
*/