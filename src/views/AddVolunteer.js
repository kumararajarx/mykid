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
  CardBody,
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
      role: 'MENTOR',
      centers: [{ id: 0, centerName: 'None' }],
      centerName: '',
      centerId: '',
      allMentees: [],
      myMentees: []
    };
    this.props = props;
    console.log('props', props);

    if (props.location.state) {
      const state = props.location.state;
      state.dob = state.dob != null ? new Date(state.dob) : null;
      this.state = state;
      this.state.pageMode = 'view';
      this.state.inputDisabled = true;
      this.state.loading = false;
      this.state.pageTitle = 'View  Volunteers';
      this.state.centers = [{ id: 0, centerName: 'None' }];
      this.state.allMentees = [];
      this.state.myMentees = [];
    }
  }

  componentDidMount() {
    let allMentees = [];
    let myMentees = [];

    console.log('mentessall-->', allMentees);
    const dbRef = firebase.firestore().collection('center');
    firebase
      .firestore()
      .collection('students')
      .where('centerId', '==', this.state.centerId)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          const student = doc.data();
          student.id = doc.id;
          allMentees.push(student);
        });
      })
      .catch(function(error) {
        console.log('errorr', error);
      });

    firebase
      .firestore()
      .collection('students')
      .where('mentorId', '==', this.state.id)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          const student = doc.data();
          student.id = doc.id;
          myMentees.push(student);
        });
      })
      .catch(function(error) {
        console.log('errorr', error);
      });

    let centers = [{ id: 0, centerName: 'None' }];

    dbRef.get().then(doc => {
      doc.docs.forEach(d => {
        let center = d.data();
        center.id = d.id;
        centers.push(center);
      });

      this.setState({
        centers: centers,
        allMentees: allMentees,
        myMentees: myMentees
      });
    });
  }

  handleChangeCenter = e => {
    const centerSelected = this.state.centers[e.target.value];
    this.setState({
      centerName: centerSelected.centerName,
      centerId: centerSelected.id
    });
  };

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
        dob: moment(this.state.dob).format('L'),
        centerName: this.state.centerName,
        centerId: this.state.centerId
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
        dob: moment(this.state.dob).format('L'),
        centerName: this.state.centerName,
        centerId: this.state.centerId
      })
      .then(docRef => {
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.error('Error adding document: ', error);
      });
  };

  assignMentee = (mentee, i) => {
    this.setState({ loading: true });
    mentee.mentorName = this.state.firstName;
    mentee.mentorId = this.state.id;

    console.log('assignMentee', mentee);

    const updateRef = firebase
      .firestore()
      .collection('students')
      .doc(mentee.id);

    updateRef
      .set({
        ...mentee
      })
      .then(docRef => {
        console.log(docRef);
        this.setState({
          loading: false,
          myMentees: [...this.state.myMentees, mentee]
        });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.error('Error adding document: ', error);
      });
  };

  removeMentee = (mentee, i) => {
    console.log('remove', i);
    this.setState({ loading: true });
    mentee.mentorName = '';
    mentee.mentorId = '';

    const updateRef = firebase
      .firestore()
      .collection('students')
      .doc(mentee.id);

    updateRef
      .set({
        ...mentee
      })
      .then(docRef => {
        console.log(docRef);
        this.state.myMentees.splice(i, 1);
        this.setState({
          loading: false
        });
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
                          <Col md="4" className="form-group">
                            <label htmlFor="feCenter">Center</label>
                            <FormSelect
                              id="feCenter"
                              name="center"
                              value={this.state.centers
                                .map(c => c.id)
                                .indexOf(this.state.centerId)}
                              onChange={this.handleChangeCenter}
                            >
                              {this.state.centers.map((value, index) => {
                                return (
                                  <option key={index} value={index}>
                                    {value.centerName}
                                  </option>
                                );
                              })}
                            </FormSelect>
                          </Col>
                          <Col md="4" className="form-group">
                            <label htmlFor="fePosition">Position</label>
                            <FormSelect
                              id="fePosition"
                              name="position"
                              value={this.state.position}
                              onChange={this.handleChange}
                            >
                              <option>None</option>
                              <option>LEADER</option>
                              <option>MANAGER</option>
                              <option>VOLUNTEER</option>
                            </FormSelect>
                          </Col>
                          <Col md="4" className="form-group">
                            <label htmlFor="fesubject">Subject Handle</label>
                            <FormSelect
                              id="fesubject"
                              name="subject"
                              value={this.state.subject}
                              onChange={this.handleChange}
                            >
                              <option>None</option>
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
              <CardHeader className="border-bottom">
                <h6 className="m-0">My students</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        Full Name
                      </th>
                      <th scope="col" className="border-0">
                        Volunteer
                      </th>
                      <th scope="col" className="border-0">
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.myMentees.map((mentee, index) => {
                      return (
                        <tr key={index + 1}>
                          <td>{index}</td>
                          <td>{mentee.firstName + ' ' + mentee.lastName}</td>
                          <td>{mentee.mentorName}</td>
                          <td>
                            <Button
                              onClick={this.removeMentee.bind(
                                this,
                                mentee,
                                index
                              )}
                            >
                              <i className="material-icons">delete</i> Remove
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardBody>
            </Card>

            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">All students</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        Full Name
                      </th>
                      <th scope="col" className="border-0">
                        Volunteer
                      </th>
                      <th scope="col" className="border-0">
                        Add
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.allMentees.map((mentee, index) => {
                      return (
                        <tr key={index + 1}>
                          <td>{index}</td>
                          <td>{mentee.firstName + ' ' + mentee.lastName} </td>
                          <td>{mentee.mentorName}</td>

                          <td>
                            <Button
                              onClick={this.assignMentee.bind(
                                this,
                                mentee,
                                index
                              )}
                            >
                              <i className="material-icons">add</i> Add
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Loading open={this.state.loading} />
      </Container>
    );
  }
}

export default AddVolunteers;
