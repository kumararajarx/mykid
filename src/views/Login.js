import React from 'react';
import PageTitle from '../components/common/PageTitle';
import { Redirect } from 'react-router-dom';
import firebase from '../firebase';

import {
  Container,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  Button
} from 'shards-react';

class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: '',
      password: '',
      toDashboard: false,
      error: false,
      errorMessage: 'User & Pass Cannot be Empty'
    };
    this.props = props;
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = e => {
    console.log('username: ' + this.state.username);
    console.log('password: ' + this.state.password);

    let userData;

    let self = this;

    firebase
      .firestore()
      .collection('volunteers')
      .where('email', '==', this.state.username)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc);
          console.log(doc.id, '=>', doc.data());
          userData = doc.data();
          localStorage.setItem('userData', JSON.stringify(userData));
          if (userData.password === self.state.password) {
            self.setState({ toDashboard: true });
          } else {
            console.log('err');
            self.setState({ error: true, errorMessage: 'User Auth Failed' });
          }
        });
      })
      .catch(function(error) {
        console.log('errorr', error);
      });
  };

  render() {
    if (this.state.toDashboard === true) {
      return <Redirect to="/blog-overview" />;
    }

    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            align="center"
            title="User Login"
            subtitle="Overview"
            md="12"
            className="ml-sm-auto mr-sm-auto"
          />
        </Row>
        <Row>
          <Col lg="3"></Col>
          <Col lg="6">
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">{this.state.title}</h6>
              </CardHeader>

              {this.state.error ? (
                <h6 className="m-0">{this.state.errorMessage}</h6>
              ) : (
                ''
              )}

              <ListGroup flush>
                <ListGroupItem className="p-3">
                  <Row>
                    <Col>
                      <Form>
                        <Row form>
                          {/* First Name */}
                          <Col md="3"></Col>
                          <Col md="6" className="form-group">
                            <label htmlFor="feUsername">Username</label>
                            <FormInput
                              id="feUsername"
                              name="username"
                              placeholder="Username"
                              value={this.state.username}
                              onChange={this.handleChange}
                            />
                          </Col>
                        </Row>
                        <Row form>
                          {/* Email */}
                          <Col md="3"></Col>
                          <Col md="6" className="form-group">
                            <label htmlFor="fePassword">Password</label>
                            <FormInput
                              type="password"
                              name="password"
                              id="fePassword"
                              placeholder=" Enter the Password"
                              value={this.state.password}
                              onChange={this.handleChange}
                            />
                          </Col>
                        </Row>
                        <Row form>
                          <Col md="3"></Col>
                          <Col md="3" className="form-group">
                            <Button theme="accent">Register</Button>
                          </Col>

                          <Col md="3" className="form-group">
                            <Button onClick={this.handleLogin} theme="accent">
                              Login
                            </Button>
                            <Col md="3"></Col>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
