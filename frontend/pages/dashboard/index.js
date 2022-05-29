import { ethers } from "ethers";
import CustomNavbar from "../../components/navbar";
import { useState, useEffect } from "react";
import DashboardCards from "../../components/dashboardCards";
import { Button, Grid } from "@mui/material";
import AddListingModal from '../../components/addListingModal';
let data = require("/data/dashboardData.json");

const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const getBalance = async (ethProvider) => {
        const balance = await ethProvider.getBalance(localStorage.getItem("account"));
        setBalance(ethers.utils.formatEther(balance));
    }

    useEffect(() => {
        const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
        getBalance(ethProvider);
        setItems([...data])
    }, [])

    const handleModalOpen = () => {
        setShowModal(true);
    }

    const handleAddition = (amount, collateral, lastBidDate, lastPayDate, maxAcceptableBid) => {
        const newItem = {
            amount,
            collateral,
            lastBidDate,
            lastPayDate,
            maxAcceptableBid,
            status: "L"
        }
        setItems([...items, newItem]);
        setShowModal(false);
    }


    return (
        <div>
            <AddListingModal handleAddition={handleAddition} open={showModal} setOpen={setShowModal} />
            <CustomNavbar />
            <div>
                <Grid container>
                    <Grid item xs={6}>
                        <div>
                            <h1 style={{ padding: "20px" }}>Balance: {balance} eth</h1>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="grid-card">
                            <Button variant="contained" style={{ backgroundColor: "orange", fontSize: "15px", margin: '10px' }} onClick={handleModalOpen}>Add Item</Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className="main">
                <h1>
                    My Loan Requests
                </h1>
                <Grid container>
                    {
                        items.map((item, index) => {
                            return (
                                <Grid item xs={3} key={index}>
                                    <div className="grid-card">
                                        <DashboardCards {...item} />
                                    </div>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div>
        </div>
    );
}

export default Dashboard