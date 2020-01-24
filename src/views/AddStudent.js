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
  Button,
  DatePicker
} from 'shards-react';

class AddStudent extends React.Component {
  constructor(props) {
    super();
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      medium: '',
      standard: '',
      school: '',
      dob: '',
      title: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      description: '',
      pageMode: 'add',
      loading: false,
      pageTitle: 'Add New Student',
      inputDisabled: false,
      role: 'MENTEE'
    };

    this.props = props;
    console.log('o');

    if (props.location.state) {
      const state = props.location.state;
      state.dob = state.dob != null ? new Date(state.dob) : null;
      this.state = state;
      this.state.pageMode = 'view';
      this.state.inputDisabled = true;
      this.state.loading = false;
      this.state.pageTitle = 'View Student';
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

  addStudent = () => {
    this.setState({ loading: true });

    const userRef = firebase.firestore().collection('students');
    userRef
      .add({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        medium: this.state.medium,
        standard: this.state.standard,
        school: this.state.school,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zipcode: this.state.zipcode,
        description: this.state.description,
        dob: moment(this.state.dob).format('L')
      })
      .then(d => {
        if (d) {
          this.setState({
            loading: false,
            pageMode: 'view',
            inputDisabled: true,
            pageTitle: 'View Student',
            id: d.id
          });
        }
      });
  };

  updateStudent = () => {
    this.setState({ loading: true });

    const updateRef = firebase
      .firestore()
      .collection('students')
      .doc(this.state.id);

    updateRef
      .set({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        medium: this.state.medium,
        standard: this.state.standard,
        school: this.state.school,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zipcode: this.state.zipcode,
        description: this.state.description,
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
      title: 'Students List',
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: '/students'
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
                          {/* Student Name */}
                          <Col md="6" className="form-group">
                            <label htmlFor="feFirstName">Student Name</label>
                            <FormInput
                              id="feFirstName"
                              name="firstName"
                              placeholder="First Name"
                              value={this.state.firstName}
                              onChange={this.handleChange}
                              disabled={this.state.inputDisabled}
                            />
                          </Col>
                          {/* Last Name */}
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
                            <label htmlFor="feMedium">Medium</label>
                            <FormSelect
                              id="feMedium"
                              name="medium"
                              value={this.state.medium}
                              onChange={this.handleChange}
                            >
                              <option>Choose...</option>
                              <option>English</option>
                              <option>Tamil</option>
                            </FormSelect>
                          </Col>
                          <Col md="6" className="form-group">
                            <label htmlFor="standard">Standard</label>
                            <FormSelect
                              id="standard"
                              name="standard"
                              value={this.state.standard}
                              onChange={this.handleChange}
                            >
                              <option>Choose...</option>
                              <option>I</option>
                              <option>II</option>
                              <option>III</option>
                              <option>IV</option>
                              <option>V</option>
                              <option>VI</option>
                              <option>VII</option>
                              <option>VIII</option>
                              <option>IX</option>
                              <option>X</option>
                            </FormSelect>
                          </Col>
                        </Row>

                        <Row form>
                          <Col md="6" className="form-group">
                            <label htmlFor="feDob">DOB</label>
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
                          <Col md="6" className="form-group">
                            <label htmlFor="school">School Name</label>
                            <FormInput
                              id="school"
                              name="school"
                              placeholder="Enter School Name"
                              value={this.state.school}
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
                        <Row form>
                          <Col md="12" className="form-group">
                            <label htmlFor="feDescription">Description</label>
                            <FormTextarea
                              id="feDescription"
                              name="description"
                              rows="5"
                              onChange={this.handleChange}
                            />
                          </Col>
                        </Row>

                        {this.state.pageMode === 'add' ? (
                          <Button theme="accent" onClick={this.addStudent}>
                            Add Student
                          </Button>
                        ) : (
                          <Button theme="accent" onClick={this.updateStudent}>
                            Update Student
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
export default AddStudent;
