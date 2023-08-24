import React from 'react'
import { Box,  } from "@chakra-ui/react";
import {Login, Header} from "@components/index";

const LoginPage = () => {
  return (
    <Box position={"relative"} minH={'100vh'}>
        <Header />
        <Login />
      </Box>
  )
}

export default LoginPage;