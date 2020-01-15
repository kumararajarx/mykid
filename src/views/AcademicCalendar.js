import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormTextarea,
  Button,
  FormInput
} from 'shards-react';

import Modal from 'react-responsive-modal';

import PageTitle from '../components/common/PageTitle';
import firebase from '../firebase';
import NavButton from '../components/common/NavButton';

import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
  top: '35%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  marginRight: '20%!important',
  width: '60%',
  transform: 'translate(-40%, -10%)'
};

class AcademicCalendar extends React.Component {
  constructor(props) {
    super();
    this.state = {
      pageTitle: 'cal',
      events: [],
      open: false,
      start: '',
      end: '',
      title: '',
      desc: ''
    };
    this.props = props;
  }

  componentDidMount() {
    const userRef = firebase.firestore().collection('timetable');
    let events = [];
    userRef.get().then(doc => {
      doc.docs.forEach(d => {
        let event = d.data();
        event.id = d.id;
        event.start = new Date(event.start);
        event.end = new Date(event.end);
        events.push(event);
      });
      console.log('test events', events);
      this.setState({ events: events });
    });
  }

  addEvent = () => {
    const event = {};

    const startStr = this.state.start.toISOString();
    const endStr = this.state.end.toISOString();

    event.start = startStr;
    event.end = endStr;
    event.title = this.state.title;
    event.desc = this.state.desc;

    const db = firebase.firestore();
    const userRef = db.collection('timetable');
    userRef
      .add(event)
      .then(resp => {
        if (resp) {
          console.log('resp', resp);
          event.start = this.state.start;
          event.end = this.state.end;
          console.log(event);
          this.setState({
            events: [...this.state.events, event],
            start: '',
            end: '',
            title: '',
            desc: ''
          });
        }
        this.onCloseModal();
      })
      .catch(e => {
        console.log('error', e);
        this.onCloseModal();
      });
  };

  handleSelect = ({ start, end }) => {
    console.log(start, end);
    this.setState({ start: start, end: end });
    this.onOpenModal();
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  viewEvent = event => {
    console.log(event);
  };

  render() {
    const { open } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title={this.state.pageTitle}
            subtitle="Overview"
            className="ml-sm-auto mr-sm-auto"
          />
        </Row>

        <Row>
          <Col lg="12">
            <Calendar
              selectable
              localizer={localizer}
              events={this.state.events}
              defaultView={Views.MONTH}
              scrollToTime={new Date(1970, 1, 1, 6)}
              defaultDate={new Date(2020, 1, 1)}
              onSelectEvent={event => this.viewEvent(event)}
              onSelectSlot={this.handleSelect}
              style={{ height: 500 }}
            />
          </Col>
        </Row>

        <Modal open={open} onClose={this.onCloseModal} styles={styles} center>
          <center>
            <h5>
              Schedule Details : <br></br>
              {this.state.start + ' - ' + this.state.end}
            </h5>
          </center>
          <br></br>
          <Row>
            <Row form>
              <Col lg=">= 768 px" className="from-group">
                <label htmlFor="fetitle">Title:</label>
                <FormInput
                  id="fetitle"
                  name="title"
                  placeholder="Title"
                  style={{ width: '500px' }}
                  value={this.state.title}
                  onChange={this.handleChange}
                  style={{ width: 450 }}
                />
              </Col>
            </Row>
          </Row>
          <br></br>
          <Row>
            <Row form>
              <Col md="12" className="from-group">
                <label htmlFor="fedesc">Description:</label>
                <FormTextarea
                  id="fedesc"
                  name="desc"
                  rows="5"
                  placeholder="Description"
                  value={this.state.desc}
                  onChange={this.handleChange}
                  style={{ height: 110, width: 450 }}
                />
              </Col>
            </Row>
          </Row>
          <br></br>
          <center>
            <Button theme="accent" onClick={this.addEvent}>
              Submit
            </Button>
          </center>
        </Modal>
      </Container>
    );
  }
}

export default AcademicCalendar;
