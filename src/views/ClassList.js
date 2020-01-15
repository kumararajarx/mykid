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

class ClassList extends React.Component {
  constructor(props) {
    super();
    this.state = { classes: [] };
    this.props = props;
  }

  parseISOString = s => {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  };

  componentDidMount() {
    const db = firebase.firestore();
    const userRef = db.collection('timetable');

    let classes = [];

    userRef.get().then(doc => {
      doc.docs.forEach(d => {
        let cla = d.data();
        cla.id = d.id;
        cla.start = this.parseISOString(cla.start);
        cla.end = this.parseISOString(cla.end);
        classes.push(cla);
      });
      console.log(classes);
      this.setState({ classes: classes });
    });
  }

  deleteClass = (id, index) => {
    console.log(id, index);
    let classes = [...this.state.classes];

    console.log(classes);
    firebase
      .firestore()
      .collection('timetable')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
        classes.splice(index, 1);
        this.setState({ classes: classes });
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  };

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Class List"
            subtitle="List"
            className="text-sm-left"
          />
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
                        Title
                      </th>
                      <th scope="col" className="border-0">
                        Description
                      </th>
                      <th scope="col" className="border-0">
                        Start
                      </th>
                      <th scope="col" className="border-0">
                        End
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
                    {this.state.classes.map((cla, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{cla.title}</td>
                          <td>{cla.desc}</td>
                          <td>{cla.start + ''}</td>
                          <td>{cla.end + ''}</td>

                          <td>
                            <NavButton
                              item={{
                                title: 'View',
                                icon: 'delete',
                                to: '/view-class'
                              }}
                              data={cla}
                            />
                          </td>
                          <td>
                            <Button
                              outline
                              theme="accent"
                              size="sm"
                              onClick={this.deleteClass.bind(
                                this,
                                cla.id,
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

export default ClassList;
