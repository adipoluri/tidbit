const blue = "#7289da";
const grey = "#424549";
const darkGrey = "#36393e";
const darkestGrey = "#282b30";
const black = "#1e2124"
const prettyBlue = "#49536F"
const textColour = "#D4D8E3"
const textBorder = "#2b3041"

// imported theme from separate file
import { createTheme } from "@mui/material";

const palette = {
    primary: { main: grey },
    secondary: { main: prettyBlue },
    text: {main: textColour},
    info: {main: textBorder}
  };
  
declare module '@mui/material/styles' {
        interface ThemeOptions {
          [key: string]: any; // 
        }
    }

export const theme = createTheme({palette});

export const prompts = [
    {
      "type":"Brainiac Mode",
      "model":"text-davinci-003",
      "prompt_header":"I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"Unknown\"",
      "max_tokens":100,
      "temperature":0,
      "top_p":1,
      "frequency_penalty":0.0,
      "prescence_penalty":0.0,
    },
    {
      "type":"Summarizer",
      "model":"text-davinci-003",
      "prompt_header":"Give me a Tl;dr of this paragraph: ",
      "max_tokens":60,
      "temperature":0.7,
      "top_p":1.0,
      "frequency_penalty":0.0,
      "prescence_penalty":1,
    },
    {
      "type":"Code Analyzer",
      "model":"code-davinci-002",
      "prompt_header":"Provide Code for the following problem or explain what the following code does: ",
      "max_tokens":64,
      "temperature":0,
      "top_p":1,
      "frequency_penalty":0.0,
      "prescence_penalty":0.0,
    },
    {
      "type":"Sentiment Analyzer",
      "model":"text-davinci-003",
      "prompt_header":"Classify the sentiment in the following text: ",
      "max_tokens":60,
      "temperature":0,
      "top_p":1,
      "frequency_penalty":0.0,
      "prescence_penalty":0.0,
    },
    {
      "type":"The TidBit™ Assistant",
      "model":"text-davinci-003",
      "prompt_header":"The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. Human: Hello, who are you? AI: I am an AI created by the TidBit Team. How can I help you today? Human: I would like to have a conversation with you. AI:",
      "max_tokens":150,
      "temperature":0.9,
      "top_p":1,
      "frequency_penalty":0.0,
      "prescence_penalty":0.6,
    },
    {
      "type":"H4RV the Comedy Bot",
      "model":"text-davinci-003",
      "prompt_header":"Marv is a chatbot that reluctantly answers questions with sarcastic responses: ",
      "max_tokens":60,
      "temperature":0.5,
      "top_p":0.3,
      "frequency_penalty":0.5,
      "prescence_penalty":0.0
    }
    ,
    {
      "type":"Imagifier",
      "model":"text-davinci-003",
      "prompt_header":"Marv is a chatbot that reluctantly answers questions with sarcastic responses: ",
      "max_tokens":60,
      "temperature":0.5,
      "top_p":0.3,
      "frequency_penalty":0.5,
      "prescence_penalty":0.0
    }
]
