import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

function MydModalWithGrid(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col xs={12} md={12} className='d-flex justify-content-center'>
              <img src="https://res.cloudinary.com/doqqdr0fm/image/upload/v1704015605/Added_dlh6mc.gif" alt="" style={{width: '50%'}} />
            </Col>
            <Col xs={12} md={12}>
              <h2 style={{textAlign:"center"}}>Note has been Added!</h2>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='success' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function MydModalWithGridLoading(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col xs={12} md={12} className='d-flex justify-content-center'>
              <img src="https://res.cloudinary.com/doqqdr0fm/image/upload/v1704361828/Animation_-_1704361705253_vazf9a.gif" alt="" style={{width: '50%'}} />
            </Col>
            <Col xs={12} md={12}>
              <h2 style={{textAlign:"center"}}>Adding Note...</h2>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

function NewNotes() {
  const [title, settitle] = useState('')
  const [description, setdecription] = useState('')
  const [uploadedOn, setuploadedOn] = useState('')
  const [imageFile, setimageFile] = useState('')
  const [modalShow, setModalShow] = useState(false);
  const [loadingShow, setloadingShow] = useState(false);
  const [isUploaded, setisUploaded] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloadingShow(true)

    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "note_image");
    data.append("cloud_name", "doqqdr0fm");

    let resultImage = await fetch("https://api.cloudinary.com/v1_1/doqqdr0fm/image/upload", {
      method: "post",
      body: data
    })

    resultImage = await resultImage.json();

    handleImageUrl(resultImage.secure_url)
  }

  const handleImageUrl = async (url) => {
    let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/add-note`, {
      method: 'post',
      body: JSON.stringify({title, description, image:url, uploadedOn}),
      headers: {
        "Content-Type": "application/json"
      }
    });

    result = await result.json();

    if(result._id) {
      setloadingShow(false)
      setModalShow(true);
    } 
  }

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setimageFile(reader.result);
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setisUploaded(true);
    previewImage(file);
  }

  useEffect(() => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const d = new Date();
    setuploadedOn(  monthNames[d.getMonth()] + " " + d.getDate() + ', ' + d.getFullYear())
  }, [])

  return (
    <>
      <div className='newNotes dashboardRender'>
        <div className="Form-container">
        <Form onSubmit={handleSubmit} encType='multipart/form-data'>
          <h2>Add Note</h2>
          <hr />
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control name='title' type="text" placeholder="Enter Title" value={title} onChange={(e)=>{settitle(e.target.value)}} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
            as="textarea"
            name='description'
            placeholder="Description"
            style={{ height: '100px' }}
            value={description}
            onChange={(e)=>{setdecription(e.target.value)}}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control id='fileInput' name='image' type="file" onChange={handleImageChange} accept='image/jpg, image/jpeg, image/png, image/jfif' />
            {<Form.Text className="text-muted" style={{display : (isUploaded) ? "none": "block"}}>
              Please upload .png, .jpg image only!
            </Form.Text>}
            <div className="image d-flex justify-content-center">
              <img src={imageFile} alt="" style={{ width: '30%', marginTop: "1.5vw" }} />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control disabled name='uploadedOn' type="text" value={uploadedOn} />
          </Form.Group>
        
          <Button variant="primary" type="submit">
            Add Note
          </Button>
        </Form>
        </div>
      </div>
      <MydModalWithGrid show={modalShow} onHide={() => {
        setModalShow(false);
        navigate('/list-notes');
      }} />
      <MydModalWithGridLoading show={loadingShow}  />
    </>
  )
}

export default NewNotes