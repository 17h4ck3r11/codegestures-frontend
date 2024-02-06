import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function ViewPage() {
  const params = useParams();
  const [data, setdata] = useState([])
  const [comments, setComments] = useState(0)
  const [userExist, setuserExist] = useState(false)
  const [username, setusername] = useState('');
  const [likeLength, setLikeLength] = useState('');

  const getUserName = async (userId) => {
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user-from-id/${userId}`);
    result = await result.json();

    return result.name
  }

  let userData = JSON.parse(localStorage.getItem("user"));

  const getData = async () => {
      let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/note-from-id/${params.id}`);
      result = await result.json()
      setdata(result);
      setComments(result.comment.length);
      setusername(userData.name);
      setLikeLength(result.like.length);
      
      const isExist = result.like.some(user => user.userId === userData._id) 
      if(isExist) {
        setuserExist(true);
      }
      else {
        setuserExist(false);
      }
  }

  const updateData = async () => {
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/note`, {
      method: "POST",
      body: JSON.stringify({title: data.title, description: data.description, image: data.image, date: data.date, month: data.month, year: data.year, views: (data.views + 1), comment: data.comment, like: data.like }),
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  useEffect(()=>{
    // updateData();
    getData();
  }, [])

  const addComment = async () => {
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/`)
  }

  const handleLikeClick = async ()=>{
    if(userExist) {
      setLikeLength(likeLength-1)
    }
    else {
      setLikeLength(likeLength+1)
    }

    setuserExist(!userExist);
  }

  return (
    <div className='viewPage d-flex flex-column justify-content-center align-items-center' style={{width: '100vw', padding: "7vw 3vw"}}>
      <h2 style={{marginBottom: '2vw', background: "-webkit-linear-gradient(#159957, #155799)", fontWeight: '900', fontSize: '3vw', backgroundClip: "text", WebkitTextFillColor: "transparent"}}>{data.title}</h2>
      <img src={data.image} style={{width: "100%"}} alt="" />
      <div className="postedOn" style={{width:"100%"}}>
        <span style={{color: '#FF1f04', fontWeight:"700", fontSize: "1vw"}}>{data.month} {data.date}, {data.year}</span>
      </div>
      <div className="activityIcons d-flex align-items-center" style={{width: "100%", fontSize:'2vw', gap: "25px"}}>
        { (userExist) ? <i style={{color:"red"}} className="bi bi-suit-heart-fill icon" onClick={handleLikeClick}> {(data.like) ? (likeLength >= 1000) ? ((likeLength/1000).toFixed(1))+"K": likeLength: ""}</i> 
                      : <i className="bi bi-suit-heart icon" onClick={handleLikeClick}> {(data.like) ? (likeLength >= 1000) ? ((likeLength/1000).toFixed(1))+"K": likeLength: ""}</i>}
        <i style={{color:"#FF1FFF"}} className="bi bi-chat icon"> {(data.comment) ? (data.comment.length >= 1000) ? ((data.comment.length/1000).toFixed(1))+"K": data.comment.length: ""}  </i>
        <i style={{color: "blue"}} className="bi bi-eye icon"> {(data.views) ? (data.views >= 1000) ? (((data.views+1)/1000).toFixed(1))+"K": (data.views+1): 1}</i>

      </div>
      <p style={{marginTop: '1rem', marginBottom: '1rem', whiteSpace: 'pre-line', width: '100%', textAlign: 'justify', fontWeight: '600', fontSize: '1.2vw' }}>{data.description}</p>
      <div style={{width: "100%"}}>
        <h4 style={{fontWeight: '700'}}>Comments</h4>
        <hr />
      </div> 
      {
        (data && data.comment && comments >= 1) ?
          ((comments>1) ? 
            <div className='commentCard'>
              {
                data.comment.map(async (item)=>{
                  let name = await getUserName(item.userId);
                  let comment = item.comment;
                  <>
                    <div className="name d-flex align-items-center" style={{gap: '15px'}}>
                      <FontAwesomeIcon icon={faUser} style={{overflow: 'hidden', padding: '2px', color:'rgba(0,0,0,0.6)', fontSize: '1.5vw', border: '1px solid rgba(0,0,0,0.5)', borderRadius: '100%'}}/> 
                      <h4 style={{marginBottom: '0'}}>{name}</h4>
                    </div>
                    <hr />
                    <h5>{comment}</h5>
                  </>
                })
              }      
              </div>
            : 
            <div className="commentCard">
              <div className="name d-flex align-items-center" style={{gap: '15px'}}>
                <FontAwesomeIcon icon={faUser} style={{overflow: 'hidden', padding: '2px', color:'rgba(0,0,0,0.6)', fontSize: '1.5vw', border: '1px solid rgba(0,0,0,0.5)', borderRadius: '100%'}}/> 
                <h4 style={{marginBottom: '0'}}>{username}</h4>
              </div>
              <hr />
              <h5>{(data.comment) ? data.comment[0].comment: ""}</h5>
            </div>
            )
          : <h5 style={{width:'100%', marginBottom: '2vw'}}>No Comment Exist!</h5>
      }

      <div className="addComment" style={{width: "100%"}}>
        <Form style={{background: "rgba(251,251,251,1)", padding: "2vw", borderRadius: "15px"}} onSubmit={addComment}>
          <h4>Add Comment Here!</h4>
          <hr style={{marginBotton: '2vw'}} />
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={3} style={{border: "1px solid rgba(0,0,0,0.5)"}} />
          </Form.Group>
          <Button variant='primary' type='submit'>Submit</Button>
        </Form>
      </div>
    </div>
  )
}

export default ViewPage
