import { useEffect, useState } from "react"
import { Divider, Stack} from "@mui/material";
import { AwesomeButton } from 'react-awesome-button';
import styles from 'react-awesome-button/src/styles/themes/theme-c137';
import donutLogo from "data-base64:~assets/icon.png"

function LogoButton() {
  const [rickRoll, setRickRoll] = useState(0);

  if(rickRoll == 21) {
    window.open("https://www.youtube.com/watch?v=KfxFHBkF19w&ab_channel=eviiee")
  }
  return (
    <> 
        <Stack direction="column" justifyContent="space-around" alignItems="center">
          <AwesomeButton cssModule={styles} size="icon" onPress={()=>{setRickRoll(rickRoll+1)}}>
              <img src={donutLogo} style={{width:"30px",height:"30px"}} title={"TidBit! 🍩 (What is 9 + 10?🤔)"}/>
          </AwesomeButton>
        </Stack>
        <Divider style={{backgroundColor:"#3c54aa"}}/>
    </>
  )
}

export default LogoButton

/*
  
*/