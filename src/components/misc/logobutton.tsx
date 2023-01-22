import { useEffect, useState } from "react"
import { Divider, Stack} from "@mui/material";
import { AwesomeButton } from 'react-awesome-button';
import styles from 'react-awesome-button/src/styles/themes/theme-c137';
import donutLogo from "data-base64:~assets/icon.png"

function LogoButton() {
  return (
    <> 
        <Stack direction="column" justifyContent="space-around" alignItems="center">
          <AwesomeButton cssModule={styles} size="icon">
              <img src={donutLogo} style={{width:"30px",height:"30px"}}/>
          </AwesomeButton>
        </Stack>
        <Divider style={{backgroundColor:"#3c54aa"}}/>
    </>
  )
}

export default LogoButton

/*
  
*/