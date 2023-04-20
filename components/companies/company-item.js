import classes from './company-item.module.css';
import Card from '../UI/card';

const CompanyItem = (props) => {
  return (
    <li>
      <Card className={classes.company_item}>
        <div className={classes.company_item__description}>
          <h2 className={classes.company_item__name}>{props.company.name}</h2>
          <div className={classes.company_item__fields}>
            <h3>NIT: {props.company.nit}</h3>
            <h3>Address: {props.company.address}</h3>
            <h3>Phone: {props.company.telephone}</h3>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default CompanyItem;
