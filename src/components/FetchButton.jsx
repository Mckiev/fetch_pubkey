import React, { useState, useRef, useEffect } from 'react';

export default function FetchButton({ recipient, updateRecipient }) {
  const [isLoading, setIsLoading] = useState(false);
  const addrRef = useRef();
  const pubkeyRef = useRef();

  useEffect(() => {
    updateRecipient(recipient.id, addrRef.current?.value, pubkeyRef.current?.value);
  }, [addrRef, pubkeyRef]);

  const handleClick = async () => {
    setIsLoading(true);
    const addr = addrRef.current.value;
    try {
      const publicKey = await getPublicKey(addr);
      pubkeyRef.current.value = publicKey;
      updateRecipient(recipient.id, addr, publicKey);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const getPublicKey = async (addr) => {
    try {
      const response = await fetch(`https://pubkey-fetch-api-605febc84e29.herokuapp.com/getkey/${addr}`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      return data.publicKey;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <input type="text" ref={addrRef} className="wallet--address" placeholder="0x..." />
      <input type="text" ref={pubkeyRef} className="wallet--pubkey" placeholder="Pubkey..." />
      <div className="button-wrapper">
        <button onClick={handleClick}>Fetch Public Key</button>
        {isLoading && <img src="../src/assets/loading.gif" alt="loading" className="loading-image" />}
      </div>
    </div>
  );
}
