import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button
} from 'shards-react';

import PageTitle from '../components/common/PageTitle';
import firebase from '../firebase';
import NavButton from '../components/common/NavButton';

class VolunteersList extends React.Component {
  constructor(props) {
    super();
    this.state = { volunteers: [] };
    this.props = props;
  }

  componentDidMount() {
    const db = firebase.firestore();
    const userRef = db.collection('volunteers');

    let volunteers = [];

    userRef.get().then(doc => {
      doc.docs.forEach(d => {
        let volunteer = d.data();
        volunteer.id = d.id;
        volunteers.push(volunteer);
      });

      this.setState({ volunteers: volunteers });
    });
  }

  deleteVolunteers = (id, index) => {
    console.log(id, index);
    let volunteers = [...this.state.volunteers];

    console.log(volunteers);
    firebase
      .firestore()
      .collection('volunteers')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');

        volunteers.splice(index, 1);

        this.setState({ volunteers: volunteers });
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  };

  render() {
    const item = {
      title: 'Add Volunteers',
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: '/add-volunteer'
    };
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}

        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Add New Volunteers"
            subtitle="List"
            className="text-sm-left"
          />
          <NavButton sm="4" item={item} className="text-sm-right" />
        </Row>

        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Active Users</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        First Name
                      </th>
                      <th scope="col" className="border-0">
                        Last Name
                      </th>
                      <th scope="col" className="border-0">
                        DOB
                      </th>
                      <th scope="col" className="border-0">
                        Highest Education
                      </th>
                      <th scope="col" className="border-0">
                        Position
                      </th>
                      <th scope="col" className="border-0">
                        Subject
                      </th>
                      <th scope="col" className="border-0">
                        Email
                      </th>
                      <th scope="col" className="border-0">
                        City
                      </th>
                      <th scope="col" className="border-0">
                        zipcode
                      </th>

                      <th scope="col" className="border-0">
                        Password
                      </th>
                      <th scope="col" className="border-0">
                        View
                      </th>
                      <th scope="col" className="border-0">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.volunteers.map((volunteers, index) => {
                      return (
                        <tr key={index + 1}>
                          <td>{index}</td>
                          <td>{volunteers.firstName}</td>
                          <td>{volunteers.lastName}</td>
                          <td>{volunteers.dob}</td>
                          <td>{volunteers.education}</td>
                          <td>{volunteers.position}</td>
                          <td>{volunteers.subject}</td>
                          <td>{volunteers.email}</td>
                          <td>{volunteers.city}</td>
                          <td>{volunteers.zipcode}</td>
                          <td>{volunteers.password}</td>
                          <td>
                            <NavButton
                              item={{
                                title: 'View',
                                icon: 'delete',
                                to: '/view-volunteer'
                              }}
                              data={volunteers}
                            />
                          </td>
                          <td>
                            <Button
                              onClick={this.deleteVolunteers.bind(
                                this,
                                volunteers.id,
                                index
                              )}
                            >
                              <i className="material-icons">delete</i> Delete
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
      </Container>
    );
  }
}

export default VolunteersList;
