import { useState } from 'react';
import { TextField } from '@mui/material';
import CustomNavbar from '../../components/navbar';
import { Button } from '@mui/material'
import FileBase64 from 'react-file-base64';
let Contract = require('../../../smart_contracts/artifacts/contracts/AssetNFT.sol/AssetNFT.json');

const smartContractAddress = '0x36ad10998708f8020572854572319358EA250aCC'


const createNFT = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [walletKey, setWalletKey] = useState('');

    const handleSubmit = () => {
        const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = ethProvider.getSigner();
        const contract = new ethers.Contract(smartContractAddress, Contract.abi, signer);
        // save it in the graph cms database
        mutationString = `mutation MyMutation {
            createNft(data: {image: "${file}", name: "${name}", description: "${description}"})
          }`;
        
        // send it to the blockchain
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