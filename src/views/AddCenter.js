import React from 'react';
import PageTitle from '../components/common/PageTitle';
import NavButton from '../components/common/NavButton';
import Loading from '../components/common/Loading';
import UserAccountDetails from '../components/user-profile-lite/UserAccountDetails';
import firebase from './../firebase';
import {
  Container,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from 'shards-react';

class AddCenter extends React.Component {
  constructor(props) {
    super();
    this.state = {
      centerName: '',
      yearEstablished: '',
      contactPersonName: '',
      contactPersonMobile: '',
      centerPhoneNumber: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      NumberofKids: '',
      pageMode: 'add',
      loading: false,
      PageTitle: 'Add New Center'
    };

    console.log(props);
    this.props = props;

    if (props.location.state) {
      this.state = props.location.state;
      this.state.pageMode = 'view';
      this.state.inputDisabled = true;
      this.state.loading = false;
      this.state.pageTitle = 'View Center';
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addCenter = () => {
    this.setState({ loading: true });
    const db = firebase.firestore();
    const userRef = db.collection('center');
    userRef
      .add({
        centerName: this.state.centerName,
        yearEstablished: this.state.yearEstablished,
        contactPersonName: this.state.contactPersonName,
        contactPersonMobile: this.state.contactPersonMobile,
        centerPhoneNumber: this.state.centerPhoneNumber,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zipcode: this.state.zipcode,
        NumberofKids: this.state.NumberofKids
      })
      .then(d => {
        console.log('addcenterrr--->', d);
        if (d) {
          this.setState({
            loading: false,
            pageMode: 'view',
            inputDisabled: true,
            pageTitle: 'View Center',
            id: d.id
          });
        }
      });
  };

  render() {
    const item = {
      title: 'Centers List',
      to: '/centers'
    };
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title={this.state.pageTitle}
            subtitle="Overview"
            className="ml-sm-auto mr-sm-auto"
          />
          <NavButton sm="4" key={112} item={item} className="text-sm-right" />
        </Row>

        <Row>
          <Col lg="6">
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">{this.state.title}</h6>
              </CardHeader>
              <ListGroup flush>
                <ListGroupItem className="p-3">
                  <Row>
                    <Col>
                      <Form>
                        <Row form>
                          {/* Center Name */}
                          <Col md="6" className="from-group">
                            <label htmlFor="fecenterName">Center Name</label>
                            <FormInput
                              id="fecenterName"
                              name="centerName"
                              placeholder="Center Name"
                              value={this.state.centerName}
                              onChange={this.handleChange}
                            />
                          </Col>
                          {/* yearEstablished */}
                          <Col md="6" className="form-group">
                            <lable htmlFor="fecenterPhoneNumber">
                              Center Phone Number
                            </lable>
                            <FormInput
                              id="fecenterPhoneNumber"
                              name="centerPhoneNumber"
                              placeholder="Center Phone Number"
                              value={this.state.centerPhoneNumber}
                              onChange={this.handleChange}
                            />
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="6" className="form-group">
                      <lable htmlFor="fecontactPersonName">
                        Contact Person Name
                      </lable>
                      <FormInput
                        id="fecontactPersonName"
                        name="contactPersonName"
                        placeholder="Contact Person Name"
                        value={this.state.contactPersonName}
                        onChange={this.handleChange}
                      />
                    </Col>

                    <Col md="6" className="form-group">
                      <lable htmlFor="fecontactPersonMobile">
                        Contact Person Mobile
                      </lable>
                      <FormInput
                        id="fecontactPersonMobile"
                        name="contactPersonMobile"
                        placeholder="Contact Person Mobile"
                        value={this.state.contactPersonMobile}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="6" className="form-group">
                      <label htmlFor="feyearEstablished">
                        Year Established
                      </label>
                      <FormInput
                        id="feyearEstablished"
                        name="yearEstablished"
                        placeholder="Year Established"
                        value={this.state.yearEstablished}
                        onChange={this.handleChange}
                      />
                    </Col>

                    <Col md="2" className="form-group">
                      <label htmlFor="feNumberofKids">Number of Kids</label>
                      <FormInput
                        id="feNumberofKids"
                        type="number"
                        name="NumberofKids"
                        placeholder="NumberofKids"
                        value={this.state.NumberofKids}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Row>

                  <FormGroup>
                    <label htmlFor="feAddress">Address</label>
                    <FormTextarea
                      id="feAddress"
                      name="address"
                      placeholder="Address"
                      value={this.state.address}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <Row form>
                    {/* City */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feCity">City</label>
                      <FormSelect
                        id="feCity"
                        name="city"
                        value={this.state.city}
                        onChange={this.handleChange}
                      >
                        <option>Choose...</option>
                        <option>Coimbatore</option>
                        <option>Chennai</option>
                        <option>Bangalore</option>
                      </FormSelect>
                    </Col>
                    {/* State */}
                    <Col md="4" className="form-group">
                      <label htmlFor="feInputState">State</label>
                      <FormSelect
                        id="feInputState"
                        name="state"
                        value={this.state.state}
                        onChange={this.handleChange}
                      >
                        <option>Choose...</option>
                        <option>TamilNadu</option>
                        <option>Kerala</option>
                        <option>TamilNadu</option>
                      </FormSelect>
                    </Col>
                    {/* Zip Code */}
                    <Col md="2" className="form-group">
                      <label htmlFor="feZipcode">Zip Code</label>
                      <FormInput
                        id="feZipcode"
                        name="zipcode"
                        placeholder="Zipcode"
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Row>
                  {this.state.pageMode === 'add' ? (
                    <Button theme="accent" onClick={this.addCenter}>
                      Add Center
                    </Button>
                  ) : (
                    <Button theme="accent" onClick={this.updateStudent}>
                      Update Center
                    </Button>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
          <Col lg="6">
            <Card small className="mb-4">
              <Loading open={this.state.loading} />
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default AddCenter;
