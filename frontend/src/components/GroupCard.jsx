import React,{useState} from 'react'
import Card from 'react-bootstrap/Card';
// import {AiTwotoneCalendar} from 'react-icons/ai';
import {AiFillEdit} from 'react-icons/ai';
import {AiFillDelete} from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import {Button} from 'react-bootstrap'
import { AiTwotoneCalendar } from 'react-icons/ai';

const GroupCard = ({key,setgroupData,groupData,allgroupsdata}) => {
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
console.log(allgroupsdata)
  return (
    <div>
    <Card  border="success" className='mx-4 my-4' style={{}} >
      <Card.Body>
        <div className='flex align-middle items-center border-2'>
        <Card.Text className='text-3xl align-middle items-center border-2 my-1'>{groupData.title}</Card.Text>
        <Card.Text className='text-3xl align-middle items-center border-2 my-1'>{groupData.groupCode}</Card.Text>
        <AiFillEdit onClick={handleShow} style={{"cursor":"pointer"}}/><AiFillDelete/>
        <Button variant="primary" onClick={handleShow} style={{"cursor":"pointer"}}> Open Group</Button>
        </div>
      </Card.Body>
    </Card>
   </div>
  )
}

export default GroupCard