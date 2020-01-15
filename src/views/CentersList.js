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

class CentersList extends React.Component {
  constructor(props) {
    super();
    this.state = { centers: [] };
    this.props = props;
  }

  componentDidMount() {
    const db = firebase.firestore();
    const userRef = db.collection('center');

    let centers = [];

    userRef.get().then(doc => {
      doc.docs.forEach(d => {
        let center = d.data();
        center.id = d.id;
        centers.push(center);
      });

      this.setState({ centers: centers });
    });
  }

  deleteCenter = (id, index) => {
    console.log(id, index);
    let centers = [...this.state.centers];

    console.log(centers);
    firebase
      .firestore()
      .collection('center')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');

        centers.splice(index, 1);

        this.setState({ centers: centers });
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  };

  render() {
    const item = {
      title: 'Add Center',
      to: '/add-center'
    };
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Center List"
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
                        CenterName
                      </th>
                      <th scope="col" className="border-0">
                        Center PhoneNumber
                      </th>
                      <th scope="col" className="border-0">
                        Contact Person
                      </th>
                      <th scope="col" className="border-0">
                        Contact PersonNumber
                      </th>
                      <th scope="col" className="border-0">
                        Year Established
                      </th>
                      <th scope="col" className="border-0">
                        Number of Kids
                      </th>
                      <th scope="col" className="border-0">
                        Address
                      </th>
                      <th scope="col" className="border-0">
                        City
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
                    {this.state.centers.map((center, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{center.centerName}</td>
                          <td>{center.centerPhoneNumber}</td>
                          <td>{center.contactPersonName}</td>
                          <td>{center.contactPersonMobile}</td>
                          <td>{center.yearEstablished}</td>
                          <td>{center.NumberofKids}</td>
                          <td>{center.address}</td>
                          <td>{center.city}</td>

                          <td>
                            <NavButton
                              item={{
                                title: 'View',
                                icon: 'delete',
                                to: '/view-center'
                              }}
                              data={center}
                            />
                          </td>
                          <td>
                            <Button
                              outline
                              theme="accent"
                              size="sm"
                              onClick={this.deleteCenter.bind(
                                this,
                                center.id,
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

export default CentersList;
