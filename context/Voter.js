import React, {useState,useEffect, Children} from 'react';
import Web3Modal from "web3modal";
import{ethers} from "ethers";
import {create as ipfsHttpClient} from 'ipfs-http-client';
import axios from 'axios';
import { useRouter } from 'next/router';    

//INTERNAL IMPORTS ////

import{VotingAddress, VotingAddressABI} from './constants';

const client = ipfsHttpClient('http://ipfs.infura.io:5001/api/v0');

const fetchContract = (signerOrProvider) =>
    new ethers.Contract(VotingAddress ,VotingAddressABI ,signerOrProvider);

export const VotingContext = React.createContext();

export const VotingProvider = ({children})=>{
    const votingTitle = 'smartest contract in the world';
const router = useRouter();
const [currentAccount , setCurrentAccount] = useState('');
const [candidateLength , setCandidateLength] = useState('');
const pushCandidate = [];
const pushVoter = [];
const candidateIndex = [];
const [candidateArray , setCandidateArray] = useState(pushCandidate);


//---------END OF the CANDIDATE DATA --------------

const [error , setError] = useState('');
const highestVote = [];

//---------- VOTER SECTION------------

const [voterArray, setVoterArray] = useState(pushVoter);
const [voterLength, setVoterLength] = useState('');
const[voterAddress, setVoterAddress] = useState([]);


//----------CONNECTING WALLETE------------

const checkIfWalletIsConnected = async()=>{
    if (!window.ethereum) return setError("please install MetaMask " );

    const account = await window.ethereum.request({method:"eth_accounts"});


if (account.length){
    setCurrentAccount(account[0]);
}
else{
    setError("please install MetaMask  then connect and reload");
   }; 

};




//----------CONNECT WALLETE------------

const connectWallet = async()=>{
    if (!window.ethereum) return setError("please install MetaMask");

    const account = await window.ethereum.request({
        method:"eth_requestAccounts",

    });

    setCurrentAccount(account[0]);
};


//----------UPLOAD TO IPFS VOTER IMAGE------------

const uploadToIPFS = async (File) => {
    try {
        const added = await client.add({content:flie});
        const url =`https://ipfs.infura.io/ipfs/${added.path}`;

        return url;
    } catch(error){
        setError("error uploading file to IPFS: " + error.message)
    }
};



    return (
        <VotingContext.Provider value={{votingTitle ,checkIfWalletIsConnected ,connectWallet,uploadToIPFS}}>
            {children}
        </VotingContext.Provider>
    )
}


//export default Voter;