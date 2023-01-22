/*global chrome*/
import React, {useEffect, useState} from "react";
import "./App.css";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import {Configuration, OpenAIApi} from "openai";

import { Box, Button, Container, Grid, TextField, Paper, Tabs, Tab } from "@mui/material";
import { ChromeReaderMode } from "@mui/icons-material";
import {BsQuestionCircleFill} from 'react-icons/bs';

function App() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  const configuration = new Configuration({
    apiKey: "",
  });

  const openapi = new OpenAIApi(configuration);

  useEffect(()=>{
    try{
      chrome.storage.local.get(null, function (data){
        if("prompt" in data){
          setPrompt(data.prompt);
        }
      });
    }catch(e){
      console.log("Error due to local state.");
    }
  }, []);

  async function handleSubmit() {
    setIsLoading(true);

    try{
      const completion = await openapi.createCompletion({
        model: "text-davinci-002",
        prompt: prompt,
        max_tokens: 100,
      });
      setResponse(completion.data.choices[0].text);
      setIsLoading(false);
    }catch (e){
      alert("Error", e);
      setIsLoading(false);
    }
  }
  return (
    <Container>
      <Box sx={{ width: "100%", mt: 4  }}>
        <Grid container>
        <Tabs orientation="vertical">
          <Tab icon={<BsQuestionCircleFill/>} iconPosition="start" label="Ask A Question"/>
          <Tab label="Generate a Picture"/>
          <Tab label="3"/>
          <Tab label="4"/>
          <Tab label="5"/>
        </Tabs>
          <Grid item sx={12}>
            <TextField
            autoFocus
            fullWidth
            label="Ligma"
            variant="outlined"
            multiline
            rows={4}
            margin="normal"
            value={prompt}
            onChange={(e) =>{
              setPrompt(e.target.value)
              chrome.storage.local.set({prompt: e.target.value});
            }}
            />
            <Button
            fullWidth
            disableElevation
            variant="contained"
            disabled={isLoading}
            onClick={() => handleSubmit()}
            startIcon={
              isLoading && (
                <AutorenewIcon
                sx={{
                  animation: "spin 2s linear infinite",
                  "@keyframes spin": {
                    "0%": {
                      transform: "rotate(360deg)",
                    },
                    "100%": {
                      transform: "rotate(0deg)",
                    },
                  },
                }}
                />
              )
            }
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} sx={{mt:3}}>
              <Paper sx={{p:3}}>{response}</Paper>
            </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;