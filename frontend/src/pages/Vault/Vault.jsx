import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../firebase";
import axios from "axios";
import Navbar from "../../components/Navbar.jsx";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, useToast } from "@chakra-ui/react";

function Vault({ thememode, toggle, user }) {
  const [fileUpload, setfileUpload] = useState(null);
  const [fileUrls, setfileUrls] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedUrl, setSetlectedUrl] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // const filesListRef = ref(storage, "files/");

  function convertToReadableDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  const uploadFile = () => {
    if (fileUpload == null) {
      toast({
        title: "No file selected.",
        description: "Please select a file to upload.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-center",
      });
      return;
    }
    const dateTime = new Date().toISOString();
    const fileName = `${fileUpload.name} ${dateTime}`;
    const fileRef = ref(storage, `files/${fileName}`);

    uploadBytes(fileRef, fileUpload).then(() => {
      getDownloadURL(fileRef).then((url) => {
        const addUrl = async () => {
          try {
            const res = await axios.post(`http://localhost:3001/api/user/addUrl/${user?._id}`, { url, fileName });
            console.log("file url", res.data);
          } catch (err) {
            console.log(err);
          }
        };
        addUrl();
        setfileUrls((prev) => [...prev, { url, fileName }]);
      });
    });
  };

  const downloadCSV = async (fileName) => {
    const fileRef = ref(storage, `files/${fileName}`);
    const url = await getDownloadURL(fileRef);
    window.open(url, "_blank");
  };

  const deleteFile = async (fileName, url) => {
    const fileRef = ref(storage, `files/${fileName}`);
    try {
      const resp = await axios.delete(`http://localhost:3001/api/user/deleteFile/${user._id}`, {
        data: { url: url }
      });

       await deleteObject(fileRef);
      console.log("Response ", resp);
      setfileUrls((prev) => prev.filter((file) => file.fileName !== fileName));
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getFiles = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/user/getUrls/${user._id}`);
        console.log(res.data);
        setfileUrls(res.data.files);
      } catch (err) {
        console.log(err);
      }
    };
    getFiles();
  }, [user._id]);

  const splitFileName = (fileName) => {
    const lastSpaceIndex = fileName.lastIndexOf(' ');
    const originalName = fileName.substring(0, lastSpaceIndex);
    const timestamp = fileName.substring(lastSpaceIndex + 1);
    return { originalName, timestamp };
  };

  return (
    <div className="h-full" style={{ backgroundColor: thememode === 'dark' ? '#181818' : '#f0f0f0' }}>
      <Navbar thememode={thememode} toggle={toggle} />

      <div className="dark:text-white h-screen">
        <div className='font-extrabold text-2xl mx-4 mt-4 dark:text-[#f0f0f0]'>Storage Vault</div>
        <div className="flex justify-between">
          <div className='mx-4 text-gray-600 dark:text-gray-400'>Export Transaction data with filters of your choice and upload them here in the vault</div>
          <div className="flex justify-end mx-4">
            <label htmlFor="actual-btn" className="text-white cursor-pointer rounded-md p-2 bg-[#8656cd] mx-1">Choose File</label>
            <input type="file" id="actual-btn" className="w-60 flex justify-center align-middle mx-2 border-none hidden" onChange={(event) => { setfileUpload(event.target.files[0]); }} />
            <button onClick={uploadFile} className="text-white cursor-pointer rounded-md p-2 bg-[#8656cd]">Upload</button>
          </div>
        </div>

        <div className="grid grid-cols-3 dark:bg-[#181818] m-4">
          {fileUrls.map((file) => {
            const { originalName, timestamp } = splitFileName(file.fileName);
            return (
              <div key={file.fileName} className="m-2 max-w-[400px] h-[100px] w-82 rounded-md shadow-md font-semibold px-2 py-2 border-1 border-black border-dashed flex align-middle justify-center items-center cursor-pointer" style={{ color: thememode === "dark" ? "white" : "black", backgroundColor: thememode === "dark" ? "#282828" : "white", borderColor: thememode === "dark" ? "white" : "black" }} alt={file.fileName}>
                <img alt="text" src="folder.png" className="h-20 w-20" onClick={() => downloadCSV(file.fileName)} />
                <div className="p-3 text-sm">
                  <div>Name - {originalName}</div>
                  <div>Time - {convertToReadableDate(timestamp)}</div>
                </div>
                <Button className="w-fit p-1" colorScheme="red" onClick={() => { setSelectedFile(file.fileName); setSetlectedUrl(file.url); onOpen(); }}>Delete</Button>
              </div>
            );
          })}
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this file?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={() => deleteFile(selectedFile, selectedUrl)} mr={3}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Vault;
