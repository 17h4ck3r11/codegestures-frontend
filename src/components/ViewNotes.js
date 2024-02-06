import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function ViewNotes() {
  const params = useParams();
  const [data, setData] = useState([]);

  const getData = async () => {
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/note-from-id/${params.id}`)
    result = await result.json()
    setData(result)
  };

  useEffect(() => {
    getData();
  });

  return (
    <div className='viewNote' style={{ width: "100%" }}>
      <div className="ContentArea d-flex flex-column align-items-center" style={{margin: '5vw 0', padding: "1.5vw 2vw", position: 'absolute', top: '0', right: '0', width: '80%' }} >
        <h2 style={{background: "-webkit-linear-gradient(#159957, #155799)", fontWeight: '900', fontSize: '3vw', textAlign: 'center', backgroundClip: "text", WebkitTextFillColor: "transparent"}}>{data.title}</h2>
        <div className="image" style={{width:'100%', overflow:'hidden', height: 'fit-content'}}>
          <img src={data.image} alt='' className='viewImage' style={{ width: "100%", marginTop: "1.5vw" }} />
        </div>
        <span style={{ marginTop: '0.5rem', width: '100%', textAlign: 'center', fontSize: "1.2vw" }}> Uploaded on: &nbsp;{data.uploadedOn} </span>
        <p style={{ marginTop: '1rem', marginBottom: '1rem', whiteSpace: 'pre-line', width: '100%', textAlign: 'justify', fontWeight: '600' }}>{data.description}</p>
      </div>
    </div>
  )
}

export default ViewNotes