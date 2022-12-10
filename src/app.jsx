import { useState, useEffect, useRef } from "react";
import "./app.css";
import BookCard from "./BookCard";
import UpdateCard from "./UpdateCard";
import CreateCard from "./CreateCard";
import RemoveCard from "./RemoveCard";

export function App() {

  const readIsMounted = useRef(false);
  const updateIsMounted = useRef(false);
  const createIsMounted = useRef(false);
  const deleteIsMounted = useRef(false);

  const [count, setCount] = useState(0);
  const [apidata, setAPIData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [read, setRead] = useState(false);
  const [update, setUpdate] = useState(false);
  const [create, setCreate] = useState(false);
  const [remove, setRemove] = useState(false);

  const [submitCreate, setSubmitCreate] = useState(null);
  const [submitRemove, setSubmitRemove] = useState(null);
  const [submitUpdate, setSubmitUpdate] = useState(null);

  const [bookData, setBookData] = useState({})
  const [bookID, setBookID] = useState(null)

  let createBookProps = {
    create, setCreate,
    submitCreate, setSubmitCreate,
    bookData, setBookData
  }

  let deleteBookProps = {
    remove, setRemove,
    submitRemove, setSubmitRemove,
    bookID, setBookID,
  }

  let updateBookProps = {
  update, setUpdate,
  submitUpdate, setSubmitUpdate,
  bookID, setBookID,
  bookData, setBookData
  }

  useEffect(() => {
    if (readIsMounted.current){
      fetch("/api/books")
      .then(res => res.json())
      .then(
        (result) => {
          setLoading(true);
          setAPIData(result);
          console.log('API data fetched')
          console.log(result)
        },
        (error) => {
          setLoading(true);
          setError(error);
        }
      )
    }else{
      readIsMounted.current = true;
    }
  }, [read])

  useEffect(() => {
    if(updateIsMounted.current){
      console.log(bookID)
      console.log(bookData)
      fetch(`/api/books/${bookID}`,  {
        method: 'PATCH',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      })
      .then(res => res.json())
      .then(
        (result) => {
          setLoading(true);
          setAPIData(result);
          console.log('API data patched')
        },
        (error) => {
          setLoading(true);
          setError(error);
        }
      )
    }else{
      updateIsMounted.current = true;
    }
  }, [submitUpdate])

  useEffect(() => {
    if(createIsMounted.current){
      console.log(bookData)
      fetch("/api/books",  {
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      })
      .then(res => res.json())
      .then(
        (result) => {
          setLoading(true);
          setAPIData(result);
          console.log('user data posted to API')
        },
        (error) => {
          setLoading(true);
          setError(error);
        }
      )
    }else{
      createIsMounted.current = true;
    }
  }, [submitCreate])

  useEffect(() => {
    if(deleteIsMounted.current){
      fetch(`/api/books/${bookID}`, {
        method: 'DELETE',
        mode: "cors",
      })
      .then(res => res.json())
      .then(
        (result) => {
          setLoading(true);
          console.log('data deleted from API')
          setRead(!read)
        },
        (error) => {
          setLoading(true);
          setError(error);
        }
      )
    }else{
      deleteIsMounted.current = true;
    }
  }, [submitRemove])


return (
    <div className="App">
      <div className="appHeader">
      <h1 style={{color: 'white', fontWeight: 'bold'}}><em>Treat Yo' Shelf</em></h1>
        <div className="buttonHolder">
            <div className="box-3">
            <div>
                <img 
                id="home"
                src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
                onClick={()=> {setRead(null), setUpdate(null), setCreate(null), setRemove(null)}}
                />
              </div>
              <div className="btn btn-three" onClick={()=> {setRead(!read)}}>
                <span>Read</span>
              </div>
              <div className="btn btn-three" onClick={()=> {setUpdate(!update)}}>
                <span>Edit</span>
              </div>
              <div className="btn btn-three"onClick={()=> {setCreate(!create)}}>
                <span>Add</span>
              </div>
              <div className="btn btn-three" onClick={()=> {setRemove(!remove)}}>
                <span>Remove</span>
              </div>

            </div>
        </div>
        <img src="https://cdn.pixabay.com/photo/2015/06/02/12/59/book-794978_960_720.jpg"/>
      </div>
      <div id="bookCards">
        {!remove ? "" : <RemoveCard {...deleteBookProps} />}
      </div>
      <div id="bookCards">
        {!create ? <div></div> : <CreateCard {...createBookProps} />}
      </div>
      <div id="bookCards">
        {!update ? <div></div> : <UpdateCard {...updateBookProps} />}
      </div>
      <div id="bookCards">
        {!read ? <div></div> : apidata.map((book, i) => 
        <BookCard {...apidata[i]} key={book + i} className="book" book={apidata[i].title}/>
      )}
      </div>
    </div>
  );
}