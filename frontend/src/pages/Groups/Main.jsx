import React,{useState} from 'react'
import Navbar from '../../components/Navbar'
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap'


export const Main = () => {
    const [showGroup, setShowGroup] = useState(false);
    const [showFriend, setShowFriend] = useState(false);

    const handleGroupClose = () => setShowGroup(false);
    const handleGroupShow = () => setShowGroup(true);

    const handleFriendClose = () => setShowFriend(false);
    const handleFriendShow = () => setShowFriend(true);
  return (
    <div>
        <Navbar/>
        <div>
        <button onClick={handleGroupShow} className='bg-[#198754]'>Add Group</button>
        <button onClick={handleFriendShow} className='bg-[#198754]'>Add Friends</button>

    <Modal show={showGroup} onHide={handleGroupClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* Add Group input section */}
            {/* <label htmlFor="type">Group Name: </label>
             <input name='name'></input>
            <br/>

            <label htmlFor='amount'>Amount: </label>
            <input type="number" 
                   name={'amount'}
                   value={amount}
                   onChange={handleTransInput('amount')}
                   required
                   ></input>

            <label htmlFor='category'>Category: </label>
            <input name={"category"}
                   type="text"
                   value={category}
                   onChange={handleTransInput('category')}
                   required
                   ></input>

            <label htmlFor='desc'>Description:</label>
            <input type='text' 
                   name={'desc'}
                   value={desc}
                   onChange={handleTransInput('desc')}
            ></input>

            <label htmlFor='date'>Date:</label>
            <input type='date'
                   name={"date"}
                   value={date}
                   onChange={handleTransInput('date')}
                   required
            ></input> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" required>Save</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showFriend} onHide={handleFriendClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* Add transaction input section */}
            {/* <label htmlFor="type">Transaction type: </label>
            <select name="type" 
                    id="type" 
                    selected="expense" 
                    value={type}
                    onChange={handleTransInput('type')}
                    className='px-1 border-1 py-1 mx-2 rounded-md'
                    required
                    >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            </select><br/>

            <label htmlFor='amount'>Amount: </label>
            <input type="number" 
                   name={'amount'}
                   value={amount}
                   onChange={handleTransInput('amount')}
                   required
                   ></input>

            <label htmlFor='category'>Category: </label>
            <input name={"category"}
                   type="text"
                   value={category}
                   onChange={handleTransInput('category')}
                   required
                   ></input>

            <label htmlFor='desc'>Description:</label>
            <input type='text' 
                   name={'desc'}
                   value={desc}
                   onChange={handleTransInput('desc')}
            ></input>

            <label htmlFor='date'>Date:</label>
            <input type='date'
                   name={"date"}
                   value={date}
                   onChange={handleTransInput('date')}
                   required
            ></input> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" required>Save</Button>
        </Modal.Footer>
      </Modal>

      
        </div>
    </div>
  )
}
