import React from 'react';

import PageTitle from '../components/common/PageTitle';
import NavButton from '../components/common/NavButton';
import Loading from '../components/common/Loading';

import firebase from './../firebase';
import moment from 'moment';

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
  DatePicker,
  Button
} from 'shards-react';

class AddVolunteers extends React.Component {
  constructor(props) {
    super();
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      education: '',
      subject: '',
      position: '',
      dob: '',
      email: '',
      address: '',
      mobileNumber: '',
      city: '',
      state: '',
      password: 'uandi2020',
      zipcode: '',
      pageMode: 'add',
      loading: false,
      pageTitle: 'Add New Volunteers',
      role: 'MENTOR'
    };
    this.props = props;

    if (props.location.state) {
      const state = props.location.state;
      state.dob = state.dob != null ? new Date(state.dob) : null;
      this.state = state;
      this.state.pageMode = 'view';
      this.state.inputDisabled = true;
      this.state.loading = false;
      this.state.pageTitle = 'View  Volunteers';
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDobChange = value => {
    this.setState({
      dob: value
    });
  };

  addVolunteers = () => {
    this.setState({ loading: true });

    const userRef = firebase.firestore().collection('volunteers');
    userRef
      .add({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        education: this.state.education,
        subject: this.state.subject,
        position: this.state.position,
        email: this.state.email,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        mobileNumber: this.state.mobileNumber,
        password: this.state.password,
        zipcode: this.state.zipcode,
        dob: moment(this.state.dob).format('L')
      })
      .then(d => {
        console.log(d);
        if (d) {
          this.setState({
            loading: false,
            pageMode: 'view',
            inputDisabled: true,
            pageTitle: 'View Volunteers',
            id: d.id
          });
        }
      });
  };

  updateVolunteers = () => {
    this.setState({ loading: true });

    const updateRef = firebase
      .firestore()
      .collection('volunteers')
      .doc(this.state.id);

    updateRef
      .set({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        education: this.state.education,
        subject: this.state.subject,
        position: this.state.position,
        email: this.state.email,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        mobileNumber: this.state.mobileNumber,
        password: this.state.password,
        zipcode: this.state.zipcode,
        dob: moment(this.state.dob).format('L')
      })
      .then(docRef => {
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.error('Error adding document: ', error);
      });
  };

  render() {
    const item = {
      title: 'Volunteers List',
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: '/volunteers'
    };
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title={this.state.pageTitle}
            subtitle="Overview"
            className="ml-sm-auto mr-sm-auto"
          />
          <NavButton sm="4" key={111} item={item} className="text-sm-right" />
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
                          <Col md="6" className="form-group">
                            <label htmlFor="feFirstName">First Name</label>
                            <FormInput
                              id="feFirstName"
                              name="firstName"
                              placeholder="First Name"
                              value={this.state.firstName}
                              onChange={this.handleChange}
                            />
                          </Col>
                          <Col md="6" className="form-group">
                            <label htmlFor="feLastName">Last Name</label>
                            <FormInput
                              id="feLastName"
                              name="lastName"
                              placeholder="Last Name"
                              value={this.state.lastName}
                              onChange={this.handleChange}
                            />
                          </Col>
                        </Row>

                        <Row form>
                          <Col md="6" className="form-group">
                            <label htmlFor="feMobileNumber">
                              Mobile Number
                            </label>
                            <FormInput
                              id="feMobileNumber"
                              name="mobileNumber"
                              placeholder="Mobile Number"
                              value={this.state.mobileNumber}
                              onChange={this.handleChange}
                            />
                          </Col>
                          <Col md="6" className="form-group">
                            <label htmlFor="fePassword">Password</label>
                            <FormInput
                              id="fePassword"
                              type="password"
                              name="password"
                              placeholder="Password"
                              value={this.state.password}
                              onChange={this.handleChange}
                            />
                          </Col>
                        </Row>

                        <Row form>
                          <Col md="6" className="form-group">
                            <label htmlFor="fesubject">Subject Handle</label>
                            <FormSelect
                              id="fesubject"
                              name="subject"
                              value={this.state.subject}
                              onChange={this.handleChange}
                            >
                              <option>Choose...</option>
                              <option>English</option>
                              <option>Maths</option>
                              <option>Science</option>
                              <option>Social</option>
                              <option>Environmental</option>
                              <option>General Knowledge</option>
                              <option>Fundamental Science</option>
                              <option>Computer Science</option>
                            </FormSelect>
                          </Col>

                          <Col md="6" className="form-group">
                            <label htmlFor="fePosition">Position</label>
                            <FormSelect
                              id="fePosition"
                              name="position"
                              value={this.state.position}
                              onChange={this.handleChange}
                            >
                              <option>Choose...</option>
                              <option>Leader</option>
                              <option>Manager</option>
                              <option>Technical Fellow</option>
                            </FormSelect>
                          </Col>
                        </Row>

                        <Row form>
                          <Col md="12" className="form-group">
                            <label htmlFor="feEducation">Education</label>
                            <FormInput
                              id="feEducation"
                              name="education"
                              placeholder="Education"
                              value={this.state.education}
                              onChange={this.handleChange}
                            />
                          </Col>
                        </Row>

                        <Row form>
                          <Col md="3" className="form-group">
                            <label htmlFor="feDob">D.O.B</label>
                            <br />
                            <DatePicker
                              id="feDob"
                              name="dob"
                              size="md"
                              selected={this.state.dob}
                              onChange={this.handleDobChange}
                              placeholderText="DOB"
                              dropdownMode="select"
                              className="text-center"
                            />
                          </Col>

                          <Col md="9" className="form-group">
                            <label htmlFor="feEmail">Email</label>
                            <FormInput
                              id="feEmail"
                              name="email"
                              placeholder="Email"
                              value={this.state.email}
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
                          <Col md="2" className="form-group">
                            <label htmlFor="feZipCode">Zip</label>
                            <FormInput
                              id="feZipCode"
                              name="zipcode"
                              placeholder="Zipcode"
                              onChange={this.handleChange}
                            />
                          </Col>
                        </Row>

                        {this.state.pageMode === 'add' ? (
                          <Button theme="accent" onClick={this.addVolunteers}>
                            Add Volunteers
                          </Button>
                        ) : (
                          <Button
                            theme="accent"
                            onClick={this.updateVolunteers}
                          >
                            Update Volunteers
                          </Button>
                        )}
                      </Form>
                    </Col>
                  </Row>
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

export default AddVolunteers;
