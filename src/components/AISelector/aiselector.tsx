import { useEffect, useState } from "react"
import { Tabs } from "@mui/material";
import {AiFillQuestionCircle, AiFillPicture, AiOutlineCheck, AiFillWechat} from 'react-icons/ai';
import {BiMeh} from 'react-icons/bi';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';


function AISelector() {
  return (
    <>
        <Tabs orientation="vertical">
          <AwesomeButton>
            <AiFillQuestionCircle/>
          </AwesomeButton>

          <AwesomeButton>
            <AiFillPicture/>
          </AwesomeButton>

          <AwesomeButton>
            <AiOutlineCheck/>
          </AwesomeButton>

          <AwesomeButton>
            <AiFillWechat/>
          </AwesomeButton>

          <AwesomeButton>
            <BiMeh/>
          </AwesomeButton>
          
          <AwesomeButton>
            <BiMeh/>
          </AwesomeButton>
        </Tabs>     
  </>
  )
}

export default AISelector

/*
    
*/