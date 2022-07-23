import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import React from 'react'
import Axios from "axios"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../component/subcomponent/Loading';

const API_URL = process.env.REACT_APP_API_URL

export default function ResetPassword() {
  const pathname = window.location.pathname;
  const email = pathname.split('/reset-password/')[1]
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const [values, setValues] = React.useState({
    email: ''
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onButtonResetPassword = async () => {
    const bodyOnForgotPassword = {
      email: values.email,
    }
    console.log(`body:`, bodyOnForgotPassword)
    console.log(`api url:`, API_URL);

    setLoading(true)
    await Axios.post(API_URL + '/users/forgotPassword', bodyOnForgotPassword)
      .then((resp) => {
        setLoading(false)
        toast({
          title: "Forgot Password Success",
          description: "Check your email",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })

        navigate('/')
      })
      .catch((err) => {
        setLoading(false)
        console.log(`error:`, err);
        if (err) {
          return toast({
            title: `Error`,
            description: err.response.data.data,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      })
  }

  return (
    <>
    <Loading state={{ loading }} />
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Enter new password
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder={`${email}`}
            _placeholder={{ color: 'gray.500' }}
            type="email"
            disabled
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" onChange={handleChange('password')}/>
        </FormControl>
        <FormControl id="re_password" isRequired>
          <FormLabel>Repeat Password</FormLabel>
          <Input type="re_password" onChange={handleChange('re_password')}/>
        </FormControl>
        <Stack spacing={6}>
          <Button
            onClick={onButtonResetPassword}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
    </>
  );
}