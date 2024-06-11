import React, { useEffect, useState } from 'react';
import TradingViewWidget from '../../components/Stocks/TradingViewWidget';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useToast } from "@chakra-ui/react";

const Stocks = ({ user, thememode, toggle }) => {
    const [input, setInput] = useState('');
    const [flag, setFlag] = useState(false);
    const [stockflag, setStockflag] = useState(false);
    const [sym, setSym] = useState('MSFT');
    const [stockData, setStockData] = useState([]);
    const [deleteStockModalOpen, setDeleteStockModalOpen] = useState(false); // State variable for delete stock modal
    const [stockToDelete, setStockToDelete] = useState('');

    const toast = useToast();

    // Function to open delete stock modal
    const openDeleteStockModal = (stockSymbol) => {
        setStockToDelete(stockSymbol);
        setDeleteStockModalOpen(true);
    };

    // Function to close delete stock modal
    const closeDeleteStockModal = () => {
        setDeleteStockModalOpen(false);
    };

        // Function to handle deletion of stock using POST
        const handleDeleteStock = async () => {
            try {
                console.log("stock id", stockToDelete);
                const response = await axios.post(`http://localhost:3001/api/user/deleteStock/${user._id}`, {
                    stockId: stockToDelete
                });
                setFlag(prev => !prev);
                console.log(response);
                setDeleteStockModalOpen(false);
            } catch (err) {
                console.log(err);
            }
        };


    // Handling user input for ticker symbol and company/crypto name
    const handleInput = e => {
        setInput(e.target.value);
    };

    // Function to set ticker symbol
    const handleSETSYM = async (e) => {
        setSym(e);
        setStockflag(prev => !prev);
    };

    // Function to add stock symbol
    const handleSubmit = async () => {
        if (input.trim() === '') {
            toast({
                title: "No input provided.",
                description: "Please enter a stock ticker symbol before saving.",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        try {
            const res = await axios.post(`http://localhost:3001/api/user/addStock/${user._id}`, { input });
            const val = res.data.user.stocks;
            setStockData(prev => ([...prev, val]));
            setFlag(prev => !prev);
            setInput("");
        } catch (err) {
            console.log(err);
        }
    };

    // Function to fetch user stocks
    useEffect(() => {
        const getStocks = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/user/getStocks/${user?._id}`);
                setStockData(res.data.val);
            } catch (err) {
                console.log(err);
            }
        };
        getStocks();
    }, [flag, user._id, user.stocks]);

    return (
        <div  className="h-full" style={{ backgroundColor: thememode === 'dark' ? '#181818' : '#f0f0f0' }}>
            <Navbar thememode={thememode} toggle={toggle} />
            <div className="mx-auto my-auto h-screen block justify-center items-center" style={{ backgroundColor: thememode === "dark" ? "#181818" : "#f0f0f0" }}>

                <div className='flex justify-center p-2 font-bold text-2xl' style={{ color: thememode === "dark" ? "white" : "black" }}></div>

                <div className='flex justify-left font-extrabold text-2xl mx-4 my-1 dark:text-[#f0f0f0]' style={{ color: thememode === "dark" ? "white" : "black" }}> Search for a particular stock/crypto...</div>
                <div className='mx-4 mb-4 text-gray-600 dark:text-gray-400'>Type the stock tick for a company and click on Save to add the stocks you would want to track for easy access later</div>

                <div className='flex justify-around'>
                    <div className='flex w-full'>
                        <div className='w-3/4'>
                            <div className='m-4 dark:text-white flex justify-center items-center w-full'>
                                <input
                                    name={"input"}
                                    type="text"
                                    value={input}
                                    onChange={handleInput}
                                    placeholder='Enter stock tick'
                                    required
                                    className='p-2'
                                />
                                <button onClick={handleSubmit} className='m-2 bg-[#8656cd] text-white rounded-md p-2'>Save</button>
                            </div>
                            <div className='px-3 w-full'>
                                <div className='w-full flex flex-wrap'>
                                    {stockData.length > 0 && stockData.map((stock, index) => (
                                        <div className='h-fit w-fit flex flex-col gap-1 justify-center items-center mx-2 mb-4 border-[#8656cd] dark:text-white shadow-md p-3 rounded-lg' key={index} onClick={() => handleSETSYM(stock.input)} style={{ cursor: "pointer", padding: "5px", backgroundColor: thememode === 'dark' ? "#2c3034" : "white" }}>
                                            <div>{stock.input}</div>
                                            <Button 
                                                size="xs" 
                                                colorScheme="red" 
                                                ml={2} 
                                                onClick={() => {
                                                    openDeleteStockModal(stock.input);
                                                    setStockToDelete(stock.input);
                                                }}
                                                >
                                                Delete
                                            </Button>

                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <TradingViewWidget sym={sym} stockflag={stockflag} thememode={thememode} />
                    </div>
                </div>

                {/* Delete Stock Modal */}
                <Modal isOpen={deleteStockModalOpen} onClose={closeDeleteStockModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Delete Stock</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Are you sure you want to delete {stockToDelete} stock?
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="red" mr={3} onClick={handleDeleteStock}>
                                Delete
                            </Button>
                            <Button variant="ghost" onClick={closeDeleteStockModal}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
};

export default Stocks;
