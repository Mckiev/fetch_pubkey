import React from "react"

export default function FetchButton() {
    const handleClick = async () => {
      const listItems = document.querySelectorAll('#recipientsList li');
  
      listItems.forEach(async (item) => {
        const addrElem = item.querySelector('.wallet--address');
        const pubkeyElem = item.querySelector('.wallet--pubkey');
  
        if (addrElem && pubkeyElem) {
          const addr = addrElem.value;
          const publicKey = await getPublicKey(addr);
          pubkeyElem.value = publicKey;
        }
      });
    };
  
    // const getPublicKey = async (addr) => {
    //     try {
    //       const response = await fetch(`http://127.0.0.1:5000/getkey/${addr}`);
    //       console.log('Response:', response);  // Debugging line
    //       const data = await response.json();
    //       console.log('Data:', data);  // Debugging line
    //       return data;
    //     } catch (error) {
    //       console.error('An error occurred:', error);
    //       return null;
    //     }
    //   };
    
    const getPublicKey = async (addr) => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/getkey/${addr}`);
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
          }
          const data = await response.json();
          return data.publicKey; // Accessing the 'publicKey' property
        } catch (error) {
          throw error;
        }
      };


    return (
      <button onClick={handleClick}>Get Public Keys</button>
    );
  }
  