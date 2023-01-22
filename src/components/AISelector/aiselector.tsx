import { useEffect, useState } from "react"
import { Tabs } from "@mui/material";
import {AiFillQuestionCircle, AiFillPicture, AiOutlineCheck, AiFillWechat} from 'react-icons/ai';
import {BiMeh} from 'react-icons/bi';
import { AwesomeButton } from 'react-awesome-button';
import styles from 'react-awesome-button/src/styles/themes/theme-c137';
import donutLogo from "data-base64:~assets/icon.png"

function AISelector() {
  return (
    <>
        <Tabs orientation="vertical">
          <AwesomeButton cssModule={styles}>
            <img src={donutLogo} style={{width:"30px",height:"30px"}}/>
          </AwesomeButton>

          <AwesomeButton cssModule={styles}>
            <AiFillQuestionCircle/>
          </AwesomeButton>

          <AwesomeButton cssModule={styles}>
            <AiFillPicture/>
          </AwesomeButton>

          <AwesomeButton cssModule={styles}>
            <AiOutlineCheck/>
          </AwesomeButton>

          <AwesomeButton cssModule={styles}>
            <AiFillWechat/>
          </AwesomeButton>

          <AwesomeButton cssModule={styles}>
            <BiMeh/>
          </AwesomeButton>
          
          <AwesomeButton cssModule={styles}>
            <BiMeh/>
          </AwesomeButton>
        </Tabs>     
  </>
  )
}

export default AISelector

/*
    
*/