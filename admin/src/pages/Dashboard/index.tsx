import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { Autocomplete, Editor, MobileNav, Sidebar } from "@components/index";
import { useState } from "react";
import hljs from "highlight.js";
import "react-quill/dist/quill.bubble.css";
import "highlight.js/styles/atom-one-dark.css";
import ReactQuill from "react-quill";
import React from "react";

hljs.configure({
  // optionally configure hljs
  languages: ["javascript"],
});

const _modules = {
  syntax: {
    highlight: (text: string) => hljs.highlightAuto(text).value,
  },
  // syntax: true,
};

const EditorView = (props: { blog: string }) => {
  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);

  return (
    <>
      <Button
        ml="4"
        style={{ margin: "10px" }}
        onClick={() => {
          setOverlay(<OverlayTwo />);
          onOpen();
        }}
        disabled={!props.blog}
      >
        Preview Blog
      </Button>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={"inside"}
        size={"6xl"}
      >
        {overlay}
        <ModalContent>
          <ModalHeader>Blog</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ReactQuill
              theme="bubble"
              value={props.blog}
              readOnly={true}
              modules={_modules}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const DashboardPage = () => {
  const [blog, setBolg] = useState("");
  const getData = (data: string) => {
    console.log(data);
    setBolg(data);
  };
  return (
    <Flex flexDirection={{ base: "column", md: "row" }}>
      <Box width={{ base: "100%", md: "23%" }}>
        <Sidebar />
      </Box>

      <Box width={{ base: "100%", md: "75%" }} p="2.5">
        <Box
          display={{ base: "none", md: "flex" }}
          flexDirection={{ base: "none", md: "column" }}
          boxShadow={{ base: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          marginBottom={"10"}
        >
          <MobileNav onOpen={() => {}} displayNavBar="flex" />
        </Box>

        <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
          Write Blog
        </Heading>
        <Stack spacing={3}>
          <Editor getData={getData} />
          <FormControl mr="5%">
            <FormLabel htmlFor="blog-header" fontWeight={"normal"}>
              Header
            </FormLabel>
            <Input
              required
              id="blog-header"
              placeholder="Enter the heading of the blog"
              focusBorderColor="lime"
            />
          </FormControl>
          <FormControl mr="5%">
            <FormLabel htmlFor="blog-image" fontWeight={"normal"}>
              Image link
            </FormLabel>
            <Input
              required
              id="blog-image"
              placeholder="Enter the image url"
              focusBorderColor="lime"
            />
          </FormControl>
          <FormControl mr="5%">
            <FormLabel htmlFor="blog-desc" fontWeight={"normal"}>
              Description(SEO)
            </FormLabel>
            <Input
              required
              id="blog-desc"
              placeholder="Enter the description of the blog"
              focusBorderColor="lime"
            />
          </FormControl>
          <FormControl mr="5%">
            <FormLabel htmlFor="blog-keywords" fontWeight={"normal"}>
              Keywords(SEO)
            </FormLabel>
            <Input
              required
              id="blog-keywords"
              placeholder="Enter the keywords of the blog"
              focusBorderColor="lime"
            />
          </FormControl>
          <FormControl mr="5%">
            <FormLabel htmlFor="blog-keywords" fontWeight={"normal"}>
              Hashtag
            </FormLabel>
           <Autocomplete/>
          </FormControl>
         
        </Stack>

        <EditorView blog={blog}></EditorView>
      </Box>
    </Flex>
  );
};

export default DashboardPage;
