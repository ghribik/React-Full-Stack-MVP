import React from 'react';
import { useState } from "react";
import Card from 'react-bootstrap/Card';

function UpdateCard(props) {

  const [titleResponse, setTitleResponse] = useState('');
  const [authorResponse, setAuthorResponse] = useState('');
  const [imgResponse, setImgResponse] = useState('');
  const [isbnResponse, setIsbnResponse] = useState('');
  const [response, setResponse] = useState('');

  const recordResponse = (event) => {
    setResponse(event.target.value);
    console.log(response)
  }

  const recordTitle = (event) => {
    setTitleResponse(event.target.value);
  }
  const recordAuthor = (event) => {
    setAuthorResponse(event.target.value);
  }
  const recordImg = (event) => {
    setImgResponse(event.target.value);
    console.log(imgResponse)
  }
  const recordIsbn = (event) => {
    setIsbnResponse(event.target.value);
  }

  function submitResponse()  {
    props.setBookID(response)
    props.setBookData({
      title: titleResponse,
      author: authorResponse, 
      cover: imgResponse,
      isbn: isbnResponse
    })

    props.setSubmitUpdate(!props.submitUpdate)
    props.setUpdate(!props.update)
  }

  return (
    <Card id="dataCard" style={{ display: 'inline-block'}}>
      <Card.Text><input id='id' className='bookInput' placeholder='Book ID Number' onChange={recordResponse}></input></Card.Text>
      <video width='450' controls autoPlay name='media'>
        <source src="https://media.istockphoto.com/id/1207745492/video/stedicam-shot-camera-moves-forward-along-shelves-filled-with-paper-books-the-huge-round.mp4?s=mp4-640x640-is&k=20&c=-7kpTeGC4T7LphcRat1Vo7ktnLWI_DNdt-1lo1FnXVk=" type="video/mp4" />
      </video>
      <Card.Body>
      <Card.Text><input id='img' className='bookInput' placeholder='Book Image URL' onChange={recordImg}></input></Card.Text>
        <Card.Title><input id='title' className='bookInput' placeholder='Book Title' onChange={recordTitle}></input></Card.Title>
        <Card.Text><input id='author' className='bookInput' placeholder='Book Author' onChange={recordAuthor}></input></Card.Text>
        <Card.Text><input id='isbn' className='bookInput' placeholder='Book ISBN' onChange={recordIsbn}></input></Card.Text>
        <div className="btn btn-three"
        onClick={()=> submitResponse()}
        ><span>SUBMIT</span></div>
      </Card.Body>
    </Card>
  );
}

export default UpdateCard;