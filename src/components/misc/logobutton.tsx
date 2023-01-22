import { useEffect, useState } from "react"
import { Divider} from "@mui/material";
import { AwesomeButton } from 'react-awesome-button';
import styles from 'react-awesome-button/src/styles/themes/theme-c137';
import donutLogo from "data-base64:~assets/icon.png"

function LogoButton() {
  return (
    <>
        <AwesomeButton cssModule={styles}>
            <img src={donutLogo} style={{width:"30px",height:"30px"}}/>
        </AwesomeButton>
        <Divider style={{backgroundColor:"#3c54aa"}}/>
    </>
  )
}

export default LogoButton

/*
  
*/