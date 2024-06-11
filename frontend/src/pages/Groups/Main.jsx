import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Text,
  Heading,
  useTheme,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import axios from 'axios';
import GroupCard from '../../components/GroupCard/GroupCard.jsx';

export const Main = ({ user, setUser, thememode, toggle, groupData, setgroupData }) => {
  const theme = useTheme();
  const { isOpen: isGroupOpen, onOpen: onGroupOpen, onClose: onGroupClose } = useDisclosure();
  const { isOpen: isGroupJoinOpen, onOpen: onGroupJoinOpen, onClose: onGroupJoinClose } = useDisclosure();
  const { isOpen: isAddFriendOpen, onOpen: onAddFriendOpen, onClose: onAddFriendClose } = useDisclosure();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupflag, setgroupflag] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [groupInput, setgroupInput] = useState({
    userId: user._id,
    title: '',
    groupCode: ''
  });
  const [joincode, setjoincode] = useState({
    userId: user._id,
    JoingCode: ''
  });

  const handleGroupInput = name => e => {
    setgroupInput({ ...groupInput, [name]: e.target.value });
  };

  const handleGroupJoinInput = name => e => {
    setjoincode({ ...joincode, [name]: e.target.value });
  };

  const handleAddFriendInput = (e) => {
    console.log(e.target.value);
    setFriendName(e.target.value);
  };

  const uuid = () => {
    var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };

  const handleSendRequest = async () => {
    try {
      const res = await axios.put(`http://localhost:3001/api/friend/sendRequest/${user._id}`, { friendName });
      console.log(res);
      alert(res.data.message);
      setFriendName("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = e => {
    console.log(groupInput);
    let groupCode = uuid();
    console.log(groupCode);
    const addgroup = async () => {
      try {
        console.log(groupInput);
        const res = await axios.post("http://localhost:3001/api/group/creategroup", { groupInput: { ...groupInput, groupCode: groupCode }, });
        console.log(res.data.newgroup);
        const val = res.data.newgroup;
        setgroupData(prev => [...prev, val]);
        setgroupflag((prev) => !(prev));
        onGroupClose();
        console.log(groupData);
      } catch (err) {
        console.log(err);
      }
    }
    addgroup();
    setgroupInput({
      userId: user._id,
      title: ''
    });
  };

  const handleJoin = e => {
    console.log("yoyy");
    // console.log(JoingCode);
    const addgroup = async () => {
      try {
        // console.log(JoingCode);
        const res = await axios.post("http://localhost:3001/api/group/joingroup", { joincode });
        console.log(res.data.newgroup);
        setgroupflag((prev) => !(prev));
        console.log(groupData);
      } catch (err) {
        console.log(err.response.error);
      }
    }
    addgroup();
    setjoincode({
      userId: user._id,
      JoingCode: ''
    });
  };

  useEffect(() => {
    const check = async () => {
      try {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          console.log(loggedInUser);
          const foundUser = JSON.parse(loggedInUser);
          console.log("found user", foundUser)
          await setUser(foundUser);
        }
      } catch (err) {
        console.log(err);
      }
    }
    check();
  }, [user._id]);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/group/getgroups/${user._id}`);
        console.log(res.data);
        setgroupData(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getGroups();
  }, [groupflag, user._id,setgroupData]);

  return (
    <Box backgroundColor={thememode === "dark" ? "#181818" : "white"}>
      <Navbar thememode={thememode} toggle={toggle} />
      <Box className='flex flex-col gap-2 justify-start items-start min-h-screen' backgroundColor={thememode === "dark" ? "#181818" : "#f0f0f0"}>
        <Box className='flex justify-between w-full'>
          <Box>
            <Heading className='font-extrabold text-2xl mx-4 mt-4' color={thememode === "dark" ? "#f0f0f0" : "black"}> Groups</Heading>
            <Text className='mx-4' color={thememode === "dark" ? "gray.400" : "gray.600"}>Invite friends, create groups and streamline bill splitting and debt settlements</Text>
          </Box>

          <Box>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                backgroundColor="#000080"
                margin="2rem"
                color="white"
                _hover={{
                  backgroundColor: '#00009A',
                  color: 'white',
                }}
              >
                + NEW
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onGroupOpen}>Create new group</MenuItem>
                <MenuItem onClick={onGroupJoinOpen}>Join Group</MenuItem>
                <MenuItem onClick={onAddFriendOpen}>Invite a friend</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>

        <Box className='flex flex-col lg:grid lg:grid-cols-4 mx-4 justify-evenly items-center gap-6 w-full h-fit' backgroundColor={thememode === "dark" ? "#181818" : "#f0f0f0"}>
          {groupData?.map(data => (
            <GroupCard
              key={data._id}
              setgroupData={setgroupData}
              groupData={data}
              allgroupsdata={groupData}
              setSelectedGroup={setSelectedGroup}
              selectedGroup={selectedGroup}
              thememode={thememode}
              toggle={toggle}
              user={user}
            />
          ))}
        </Box>

        {/* ADD GROUP MODAL */}
        <Modal isOpen={isGroupOpen} onClose={onGroupClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Group</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <label htmlFor='title'>Group Name: </label>
              <Input
                type="text"
                name='title'
                value={groupInput.title}
                onChange={handleGroupInput('title')}
                required
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleSubmit} required>Save</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* JOIN GROUP MODAL */}
        <Modal isOpen={isGroupJoinOpen} onClose={onGroupJoinClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Join Group</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <label htmlFor='JoingCode'>Group Code: </label>
              <Input
                type="text"
                name='JoingCode'
                value={joincode.JoingCode}
                onChange={handleGroupJoinInput('JoingCode')}
                required
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleJoin} required>Save</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* ADD FRIEND MODAL */}
        <Modal isOpen={isAddFriendOpen} onClose={onAddFriendClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Friend</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <label htmlFor='friendName'>Enter Username of friend: </label>
              <Input
                type="text"
                name='friendName'
                value={friendName}
                onChange={handleAddFriendInput}
                required
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleSendRequest} required>Invite</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  )
};
