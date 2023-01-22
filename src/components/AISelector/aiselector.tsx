import { useEffect, useState } from "react"
import { Stack, Divider} from "@mui/material";
import {AiFillQuestionCircle, AiFillPicture, AiOutlineCheck, AiFillWechat} from 'react-icons/ai';
import {BiMeh} from 'react-icons/bi';
import { AwesomeButton } from 'react-awesome-button';
import styles from 'react-awesome-button/src/styles/themes/theme-c137';
import donutLogo from "data-base64:~assets/icon.png"

function AISelector() {
  const [value, setValue] = useState(2);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Stack spacing={0.4} direction="column" justifyContent="flex-start" alignItems="center">
        <AwesomeButton cssModule={styles}>
          <AiFillQuestionCircle size={"1.5em"}/>
        </AwesomeButton>
        <AwesomeButton cssModule={styles}>
          <AiFillPicture size={"1.5em"}/>
        </AwesomeButton>
      </Stack>
    </>
  )
}

export default AISelector

/*
  
*/