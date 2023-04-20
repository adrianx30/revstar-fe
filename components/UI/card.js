import classes from './card.module.css';

function Card(props) {
    const finalClass = `${classes.card} ${props.className}`;
  return <div className={finalClass}>{props.children}</div>;
}

export default Card;
