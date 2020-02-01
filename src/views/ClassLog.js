import React from 'react';
import {
  Container,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  FormSelect,
  FormTextarea,
  Button,
  CardBody
} from 'shards-react';

import PageTitle from '../components/common/PageTitle';
import firebase from '../firebase';
import NavButton from '../components/common/NavButton';
import Loading from '../components/common/Loading';

class ClassLog extends React.Component {
  constructor(props) {
    super();
    this.state = {
      volunteerId: JSON.parse(localStorage.getItem('userData')).id,
      volunteerName: JSON.parse(localStorage.getItem('userData')).firstName,
      attendance: '',
      comment: '',
      loading: false,
      studentLogs: [],
      students: [{ id: 0, firstName: 'None' }],
      studentName: '',
      studentId: ''
    };
    this.props = props;
    // console.log('check prop det--->', props);
    if (props.location.state) {
      const state = props.location.state;
      console.log(state);
      this.state.classId = state.classId;
      this.state.title = state.title;
      this.state.desc = state.desc;
      this.state.pageTitle = 'View Class';
    }
  }

  componentDidMount() {
    let students = this.state.students;
    let self = this;

    console.log(this.state.volunteerId);

    firebase
      .firestore()
      .collection('students')
      .where('mentorId', '==', this.state.volunteerId)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          const d = doc.data();
          console.log(d);
          students.push(d);
        });
        self.setState({ students: students });
      })
      .catch(function(error) {
        console.log('errorr', error);
      });
  }

  handleChangeStudent = e => {
    const studentSelected = this.state.students[e.target.value];
    this.setState({
      studentName: studentSelected.firstName + ' ' + studentSelected.lastName,
      studentId: studentSelected.id
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addStudentLog = () => {
    this.setState({ loading: true });

    const db = firebase.firestore();
    const userRef = db.collection('class_log');

    const st_log = {
      studentName: this.state.studentName,
      studentId: this.state.studentId,
      comment: this.state.comment,
      classId: this.state.classId,
      volunteerId: this.state.volunteerId,
      volunteerName: this.state.volunteerName
    };
    console.log(st_log);
    userRef.add(st_log).then(a => {
      console.log(a);
      this.setState({
        loading: false,
        studentLogs: [...this.state.studentLogs, st_log]
      });
    });
  };

  render() {
    const item = {
      title: 'Classe Log',
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: '/classe-log'
    };
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title={this.state.title}
            subtitle={this.state.desc}
            className="text-sm-left"
          />
          <NavButton sm="4" item={item} className="text-sm-right" />
        </Row>

        <Row>
          <Col lg="4">
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <div>Attendance</div>
              </CardHeader>
              <ListGroup flush>
                <ListGroupItem className="px-4">
                  <div className="progress-wrapper">
                    <Col md="12" className="form-group">
                      <label htmlFor="feStudent">Student:</label>
                      <FormSelect
                        id="feStudent"
                        name="student"
                        value={this.state.students
                          .map(c => c.id)
                          .indexOf(this.state.studentId)}
                        onChange={this.handleChangeStudent}
                      >
                        {this.state.students.map((value, index) => {
                          return (
                            <option key={index} value={index}>
                              {value.firstName}
                            </option>
                          );
                        })}
                      </FormSelect>
                    </Col>
                    <Col md="12" className="form-group">
                      <label htmlFor="feComment">Comment:</label>
                      <FormTextarea
                        id="feComment"
                        name="comment"
                        value={this.state.comment}
                        onChange={this.handleChange}
                      />
                    </Col>
                    <Button theme="accent" onClick={this.addStudentLog}>
                      Submit
                    </Button>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>

          <Col lg="8">
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Class Logs</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        Student
                      </th>
                      <th scope="col" className="border-0">
                        Volunteer
                      </th>
                      <th scope="col" className="border-0">
                        Comments
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.studentLogs.map((attd, index) => {
                      return (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>{attd.studentName}</td>
                          <td>{attd.volunteerName}</td>
                          <td>{attd.comment}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
          <Card small className="mb-4">
            <Loading open={this.state.loading} />
          </Card>
        </Row>
      </Container>
    );
  }
}
export default ClassLog;
