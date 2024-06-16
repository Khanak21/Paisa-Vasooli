import React, { useEffect, useState } from 'react';
import axios from "axios";
import Navbar from '../../components/Navbar'
import { useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { ReactComponent as Cash } from './cash-on-wallet.svg';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { MdContentCopy } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import { Button } from 'react-bootstrap';

const SimplifyDebt = ({ user, thememode, toggle }) => {
    const { id } = useParams();
    const [inputFields, setInputFields] = useState([]);
    const [groupData, setGroupData] = useState([]);
    const [data, setData] = useState([]);
    const [commentFlag, setCommentFlag] = useState(false);
    const [showPart, setShowPart] = useState(false);
    const handleShowPart = () => setShowPart(true);
    const handleClosePart = () => setShowPart(false);
    const [membersData, setMembersData] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [copied, setCopied] = useState(false);

    const handleCopyToClipboard = () => {
        setCopied(true);
        alert("Copied to clipboard")
      };

    const getGroup = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/group/getgroup/${id}`);
            setGroupData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleInputChange = (index, fieldName, value) => {
        const updatedInputFields = [...inputFields];
        if (fieldName === 'paidFor') {
            const newPaidFor = [...updatedInputFields[index][fieldName]];
            if (newPaidFor.includes(value)) {
                newPaidFor.splice(newPaidFor.indexOf(value), 1);
            } else {
                newPaidFor.push(value);
            }
            updatedInputFields[index][fieldName] = newPaidFor;
        } else {
            updatedInputFields[index][fieldName] = value;
        }
        setInputFields(updatedInputFields);
    };

    const handleAddField = () => {
        setInputFields([...inputFields, { paidBy: '', paidFor: [], amount: '' }]);
    };

    const handleRemoveField = (index) => {
        const updatedInputFields = [...inputFields];
        updatedInputFields.splice(index, 1);
        setInputFields(updatedInputFields);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const resultMap = inputFields.reduce((result, item) => {
            const key = item.paidBy;
            const splitAmount = item.amount / item.paidFor.length;

            if (result[key]) {
                item.paidFor.forEach(paidForPerson => {
                    if (result[key].paidFor[paidForPerson]) {
                        result[key].paidFor[paidForPerson] += splitAmount;
                    } else {
                        result[key].paidFor[paidForPerson] = splitAmount;
                    }
                });
            } else {
                result[key] = {
                    paidBy: item.paidBy,
                    paidFor: {}
                };
                item.paidFor.forEach(paidForPerson => {
                    result[key].paidFor[paidForPerson] = splitAmount;
                });
            }

            return result;
        }, {});

        const outputArray = Object.values(resultMap);
        const simplify = async () => {
            try {
                const res = await axios.post(`http://localhost:3001/api/group/simplifyDebt/${id}`, { outputArray });
                setData(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        simplify();
        setInputFields([]);
    };

    useEffect(() => {
        const getDebts = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/group/getDebts/${id}`);
                setData(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getDebts();
    }, [id]);

    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleAddComment = async () => {
        try {
            const res = await axios.post(`http://localhost:3001/api/group/addcomment`, {
                userId: user._id,
                text: commentText,
                groupId: id,
                username: user.username
            });
            setCommentText('');
            setCommentFlag(prev => !prev);
        } catch (err) {
            console.log(err);
        }
    };

    const getComments = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/group/getcomments/${id}`);
            setComments(response.data.commentss);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        getComments();
    }, [commentFlag, comments.length]);

    const getMembers = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/group/getmembers/${id}`);
            setMembersData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getGroup();
        getMembers();
    }, [id]);

    const CheckboxGroup = ({ options, selectedValues, onChange }) => (
        <div >
            {options.map((option, index) => (
                <div key={index} className='w-full flex justify-between align-middle items-center text-slate-700 m-2 dark:text-white'>
                  <label className='w-[80%] dark:text-slate-200'>{option.username}</label>
                    <input
                        type="checkbox"
                        value={option.username}
                        checked={selectedValues.includes(option.username)}
                        onChange={(e) => onChange(e.target.value)}  
                        className='h-6'
                    />
                    
                </div>
            ))}
        </div>
    );

    return (
        <div className='pb-2 dark:bg-[#181818] dark:text-white bg-[#f0f0f0]'>
            <Navbar thememode={thememode} toggle={toggle} />
            <div className='font-extrabold text-2xl mx-4 mt-4 dark:text-[#f0f0f0]'>Simplify Debts</div>
            <div className='flex justify-between'>
                <div className="mx-3 text-xl bg-[#f0f0f0] text-slate-500 dark:bg-[#181818] dark:text-[#f0f0f0] p-2">
                     {groupData.title}
                </div>
            
              <div className='flex'>
            <CopyToClipboard text={groupData.groupCode} onCopy={handleCopyToClipboard}>
            <Tooltip title="Copy group code to clipboard" arrow>
            <button>
            <MdContentCopy  className='ml-2 text-xl'/>
            </button>
            </Tooltip>
            </CopyToClipboard>
            <Tooltip title="View members" arrow>
            <PeopleAltIcon  onClick={handleShowPart}
                    sx={{
                        cursor:'pointer',
                        marginRight:'2rem',
                        marginLeft:'1rem',
                        marginTop:'.6rem',
                        color:thememode==='dark'?'white':'black'
                    }}/>
            </Tooltip>
            </div>
            </div>
            <Modal show={showPart} onHide={handleClosePart} animation={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Group Participants</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='flex-col'>
                        {membersData?.map(data => (
                            <div key={data?._id}>{" "}{data?.username}{" "}</div>
                        ))}
                    </div>
                </Modal.Body>
            </Modal>
            <div className={`grid grid-cols-2`}>
            <div className='overflow-auto h-[65vh]'>
            <form onSubmit={handleSubmit} className='p-3 mx-auto flex flex-col gap-3 justify-center'>
                {inputFields.map((field, index) => (
                    <div key={index} className='flex justify-center gap-3 w-[40%] mx-auto rounded-lg'>
                        <div className='gap-3'>
                            <div className='text-slate-500 mb-2'>
                                <label htmlFor={`paidBy-${index}`} className='dark:text-white'>Paid By</label>
                                <select
                                    value={field.paidBy}
                                    onChange={(e) => handleInputChange(index, 'paidBy', e.target.value)}
                                    className="w-80 p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="" disabled>Select a member</option>
                                    {membersData.map((member, i) => (
                                        <option key={i} value={member?.username}>{member?.username}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='text-slate-500'>
                                <label htmlFor={`paidFor-${index}`} className='dark:text-white'>Paid For</label>
                                <CheckboxGroup
                                    options={membersData}
                                    selectedValues={field.paidFor}
                                    onChange={(value) => handleInputChange(index, 'paidFor', value)}
                                />
                            </div>
                            <label htmlFor={`amount-${index}`} className='text-slate-500 dark:text-white'>Amount</label>
                            <div className='flex-col'>
                            <input
                                type="number"
                                value={field.amount}
                                onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                                placeholder="Amount"
                                className='w-80 h-10 '
                            />
                            <button type="button" className='bg-[#000080] p-2 rounded-md text-white m-2' onClick={() => handleRemoveField(index)}>
                                Remove
                            </button>
                            </div>
                        </div>
                    </div>
                ))}
            </form>

            <div className='flex w-full justify-center'>
                <button onClick={handleAddField} className='bg-[#000080] p-2 rounded-md text-white m-2'>Add Payment</button>
                <button type="submit" onClick={handleSubmit} className='bg-[#000080] p-2 rounded-md text-white m-2'>Simplify Debt</button>
            </div>
            </div>
            <div className='relative overflow-auto h-[65vh]'>
            {data && data.length > 0 ? (
              <>
                <div className='absolute inset-0 flex justify-center items-center opacity-20 pointer-events-none'>
                  <Cash />
                </div>
                <div className='relative z-10'>
                  {data.map(debt => (
                    <div key={debt[0]} className='flex items-center bg-gray-300 rounded-2xl justify-between m-2 w-[95%] dark:bg-[#282828] text-sm'>
                      <div className='w-[60%] flex align-middle p-3'>{debt[0]}{" "} &#8594; {debt[1]} {" "}&#x20B9;{debt[2]}</div>
                      {user?.username === debt[1] && (
                        <button onClick={async () => {
                          try {
                            const res = await axios.post(`http://localhost:3001/api/group/approveDebt/${id}`, debt);
                            setData(res.data.simplifyDebt);
                            console.log(res.data);
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                          className='bg-[#000080] p-1 rounded-md text-white m-2'>
                          {debt[3] === true ? "Approved" : "Approve"}
                        </button>
                      )}
                      {user?.username === debt[0] && debt[3] === true && <div>Approved by {debt[1]}✅</div>}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className='flex justify-center items-center h-full py-10 pr-20 opacity-50'>
                <Cash />
              </div>
            )}
          </div>
            
            </div>

            <h3 className='mx-4 mt-4'>Comments:</h3>
            <div className='mx-4'>
                <input
                    type="text"
                    id="commentText"
                    value={commentText}
                    onChange={handleCommentChange}
                    placeholder="Type your comment here"
                    className="w-[50%] h-10 p-2 border border-gray-300 rounded-md text-black"
                />
                <button onClick={handleAddComment} className="bg-[#000080] p-2 rounded-md text-white m-2">
                    Add Comment
                </button>
            </div>
            <div className="mt-4 mx-4 mb-20 ">
            {comments.map((comment) => (
                <div key={comment._id} className="rounded-full text-sm w-[70%] bg-[#d1d5db]">
                 <p className='px-3 py-2'>{comment?.username === user?.username ?'You' : comment?.username}:{comment.text}</p>
        </div>
    ))}
    
    
</div>



        </div>
    );
};

export default SimplifyDebt;