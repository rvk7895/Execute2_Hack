import { useState } from 'react';
import { TextField } from '@mui/material';
import CustomNavbar from '../../components/navbar';
import { Button } from '@mui/material'
import FileBase64 from 'react-file-base64';

const createNFT = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        console.log(file, name, description);
    }

    return (
        <div>
            <CustomNavbar />
            <div className="main">
                <h1>Create NFT</h1>
                <div style={{ margin: "20px" }}>
                    <FileBase64 onDone={e => setFile(e.base64)}/>
                </div>
                <div className="input-field">
                    <TextField id="filled-basic" label="Name" variant="filled" onChange={e => setName(e.target.value)} fullWidth />
                </div>
                <div className="input-field">
                    <TextField id="filled-basic" label="Description" variant="filled" onChange={e => setDescription(e.target.value)} multiline fullWidth />
                </div>
                    <Button variant="contained" style={{ backgroundColor: "orange", fontSize: "15px", margin: '10px' }} onClick={handleSubmit} >Create</Button>
            </div>
        </div>
    )
}

export default createNFT;