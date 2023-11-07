import React from 'react'
import Card from 'react-bootstrap/Card';

const TransactionCard = () => {
  return (
    <div>
        {/* <div className='border-2 rounded-md mx-4 my-2'>
            <div>
            Sabji 
            <div>
                this is a sabzi
            </div>
            <div>
                $100
            </div>

            </div>
            <div>
                7/9/23
            </div>
           
        </div> */}
    <Card variant="light" border="success" className='mx-4 my-4'>
      <Card.Header>Food</Card.Header>
      <Card.Body>
        <div className='flex'><Card.Text className='text-3xl'>$300</Card.Text>
        <Card.Text>7/9/23</Card.Text></div>
        <Card.Text>
            Food for thought
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  )
}

export default TransactionCard