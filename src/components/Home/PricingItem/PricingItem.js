import React, { useContext } from 'react';
import { Button, Col, Row, Tab } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import carImg from '../../../images/car-img.png';

const PricingItem = (props) => {
  const {setSelectedPackage, isAdmin } = useContext(UserContext);
  const{ data: { Packagetitle, Packageprice, Packagedescription }, id }=props;
  // console.log(data);
    return (
        <Tab.Pane eventKey={id + 1}>
            <Row>
                <Col lg={12} md={12} xs={12}>
                    <Fade bottom duration={2000} distance="40px">
                        <div className={`pricing-img-${id + 1}`}>
                            <div className={`pricing-text-${id + 1}`}>
                                <span><small>$</small>{Packageprice}</span>
                                <h4><Link to="/">{Packagetitle}</Link></h4>
                                <p>{Packagedescription.slice(0, 94)}</p>
                                <Button
                                className="btn-main"
                                as={Link}
                                to={isAdmin ? "/dashboard/orderList" : "/dashboard/book"}
                                onClick={() =>setSelectedPackage(props.data)}>
                                Book Now
                            </Button>
                            </div>
                            
                            <img src={carImg} alt="" />
                        </div>
                    </Fade>
                </Col>
            </Row>
        </Tab.Pane>
    );
};

export default PricingItem;