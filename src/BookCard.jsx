import Card from 'react-bootstrap/Card';

function BookCard(props) {

  return (
    <Card style={{ display: 'inline-block'}}>
      <Card.Text className='bookText'>Book Stock #{props.id}</Card.Text>
      <Card.Img variant="top" src={props.cover} />
      <Card.Body>
        <Card.Text className='bookText'>{props.title}</Card.Text>
        <Card.Text className='bookText'>{props.author}</Card.Text>
        <div style={{cursor: "pointer"}}
        onClick={()=> window.open(`https://www.google.com/search?q=${props.isbn}`)}
        ><a id="isbnLink">isbn: {props.isbn}</a></div>
        <Card.Text className='bookText'>{props.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default BookCard;