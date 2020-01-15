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

class TestList extends React.Component {
  constructor(props) {
    super();
    this.state = { tests: [] };
    this.props = props;
  }

  componentDidMount() {
    const db = firebase.firestore();
    const userRef = db.collection('tests');

    let tests = [];

    userRef.get().then(doc => {
      doc.docs.forEach(d => {
        let test = d.data();
        test.id = d.id;
        tests.push(test);
      });

      this.setState({ tests: tests });
    });
  }

  deleteTest = (id, index) => {
    console.log(id, index);
    let tests = [...this.state.tests];

    console.log(tests);
    firebase
      .firestore()
      .collection('tests')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');

        tests.splice(index, 1);

        this.setState({ tests: tests });
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  };

  render() {
    const item = {
      title: 'Examinations',
      to: '/add-test'
    };

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Test List"
            subtitle="List"
            className="text-sm-left"
          />
          <NavButton sm="4" item={item} className="text-sm-right" />
        </Row>

        <Row>
          <Col>
            <Card small className="mb-6">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Active Users</h6>
              </CardHeader>
              <CardBody className="p-0 pb-2">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" align="center" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        Exam Name
                      </th>
                      <th scope="col" className="border-0">
                        Subject
                      </th>
                      <th scope="col" className="border-0">
                        Exam Date
                      </th>
                      <th scope="col" className="border-0">
                        Exam Time
                      </th>
                      <th scope="col" className="border-0">
                        Description
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
                    {this.state.tests.map((test, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{test.examName}</td>
                          <td>{test.subject}</td>
                          <td>{test.examDate}</td>
                          <td>{test.examTime}</td>
                          <td>{test.description}</td>
                          <td>
                            <NavButton
                              item={{
                                title: 'View',
                                icon: 'delete',
                                to: '/view-test'
                              }}
                              data={test}
                            />
                          </td>
                          <td>
                            <Button
                              outline
                              theme="accent"
                              size="sm"
                              onClick={this.deleteTest.bind(
                                this,
                                test.id,
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

export default TestList;
