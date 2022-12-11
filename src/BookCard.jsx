import Card from 'react-bootstrap/Card';

function BookCard(props) {

  return (
    <Card style={{ display: 'inline-block'}}>
      <Card.Text className='bookText'>Book Stock #{props.id}</Card.Text>
      <Card.Img variant="top" src={props.cover} />
      <Card.Body>
        <Card.Title className='bookText'>{props.title}</Card.Title>
        <Card.Text className='bookText'>{props.author}</Card.Text>
        <div style={{cursor: "pointer"}}
        onClick={()=> window.open(`https://www.google.com/search?q=${props.isbn}`)}
        ><a style={{color: 'darkblue', fontWeight: 'bold'}}>isbn: {props.isbn}</a></div>
        <Card.Text className='bookText'>{props.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default BookCard;