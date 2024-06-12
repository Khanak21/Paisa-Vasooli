import React, { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button, Checkbox, Box, Text, IconButton, Menu, MenuButton, MenuList, MenuItem, Card, CardBody, CardFooter, CardHeader, Heading, useTheme } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MdMoreVert } from 'react-icons/md';
import axios from 'axios';

const GroupCard = ({ key, setgroupData, groupData, allgroupsdata, setSelectedGroup, selectedGroup, thememode, toggle, user }) => {
  const navigate = useNavigate();
  const theme = useTheme(); 
  // eslint-disable-next-line no-unused-vars
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [showGroupHome, setShowGroupHome] = useState(false);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState([]);
  const [checkedState, setCheckedState] = useState(new Array(user.friends.length).fill(false));
  // eslint-disable-next-line no-unused-vars
  const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  // const [copied, setCopied] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDots = () => {
    setAnchorEl(null);
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item);
    setCheckedState(updatedCheckedState);
  };

  useEffect(() => {
    checkedState.forEach((item, index) => {
      if (item) setFriends(prev => [...prev, user.friends[index]]);
    });
  }, [checkedState,user.friends]);

  const handleAddFriendsToGroup = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.put(`http://localhost:3001/api/group/addfriendsgroup/${groupData._id}`, { friends });
      handleAddFriendClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddFriendClose = () => setShowAddFriend(false);
  const handleAddFriendShow = () => {
    handleCloseDots();
    setShowAddFriend(true);
  };

  // const handleCopyToClipboard = () => {
  //   setCopied(true);
  //   alert("Copied to clipboard");
  // };

  // const handleClose = () => setShowAddFriend(false);
  const handleShow = () => onOpen();

  // const handleOpenGroup = () => {
  //   setShowGroupHome(true);
  //   setSelectedGroup(groupData);
  // };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:3001/api/group/deleteGroup/${groupData._id}`);
      const sav = res.data.groupp;
      console.log(res.data)
      console.log("Group data id",groupData._id)
      setgroupData(allgroupsdata.filter(data => data._id !== sav._id));
    } catch (err) {
      console.log(err);
    }
  };

  // const handlePaid = () => {
  //   console.log("clicked");
  // };

  return (
    <Box className="flex justify-center items-center card-parent h-full p-1">
      <Card bg={thememode === 'dark' ? theme.colors.gray[900] : theme.colors.white} color={thememode === 'dark' ? 'white' : 'black'}>
        <CardHeader>
          <Box className="flex justify-between">
            <Heading size="md">{groupData.title}</Heading>
            <Menu>
              <MenuButton as={IconButton} icon={<MdMoreVert/>} variant="outline" onClick={handleClick} />
              <MenuList>
                <MenuItem onClick={handleAddFriendShow}>+ Add member</MenuItem>
                <MenuItem onClick={handleShow}>Edit group</MenuItem>
                <MenuItem onClick={handleDelete}>Delete group</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </CardHeader>
        <CardBody>
          <Text>{groupData.members.length} member{groupData.members.length > 1 && 's'}</Text>
        </CardBody>
        <CardFooter>
          <Button variant="link" onClick={() => navigate(`/simplifydebt/${groupData._id}`)}>Settle transactions ⟶</Button>
        </CardFooter>
      </Card>

      <Modal isOpen={showAddFriend} onClose={handleAddFriendClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select friends to be added</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box className="friends-list">
              {user.friends.map((name, index) => (
                <Box key={index} className="toppings-list-item h-8 align-middle">
                  <Checkbox isChecked={checkedState[index]} onChange={() => handleOnChange(index)}>{name}</Checkbox>
                </Box>
              ))}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddFriendsToGroup}>Add to group</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GroupCard;
