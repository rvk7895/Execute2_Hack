import { useState } from 'react';
import { TextField } from '@mui/material';
import CustomNavbar from '../../components/navbar';
import { Button } from '@mui/material'

const createNFT = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div>
            <CustomNavbar />
            <div className="main">
                <h1>Create NFT</h1>
                <div style={{ margin: "20px" }}>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div className="input-field">
                    <TextField id="filled-basic" label="Name" variant="filled" onChange={e => setName(e.target.value)} fullWidth />
                </div>
                <div className="input-field">
                    <TextField id="filled-basic" label="Description" variant="filled" onChange={e => setDescription(e.target.value)} multiline fullWidth />
                </div>
                    <Button variant="contained" style={{ backgroundColor: "orange", fontSize: "15px", margin: '10px' }}>Create</Button>
            </div>
        </div>
    )
}

export default createNFT;