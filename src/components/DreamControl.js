import React from 'react';
import PropTypes from 'prop-types';
import { propTypes } from 'react-bootstrap/esm/Image';
import People from './People';
import Dreams from './Dreams';
import { withFirestore } from 'react-redux-firebase';
import { Button } from "react-bootstrap";
import { render } from '@testing-library/react';
import { connect } from 'react-redux';
import ShowPerson from './ShowPerson';

class DreamControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisible: false,
      selectedPerson: null
    }
  }

  showForm = (formState) => {
    if (formState) {
    this.setState({
      formVisible: false
    })
    } else {
      this.setState({
        formVisible: true
      })
    }
  }

  handleAddingNewPersonToList = (newPerson) => {
    console.log("This happened")
  }

  handleAddingNewDreamToList = (newDream) => {
    console.log("Dream Added")
    this.setState({})
  }

  selectPerson = (id) => {
    this.props.firestore.get({collection: 'people', doc: id}).then((person) => {
      const firestorePerson = {
        name: person.get("name"),
        location: person.get("location"),
        id: person.id
      }
      this.setState({selectedPerson: firestorePerson });
    });
  }

  handleEditingTicketInList = () => {
    this.setState({
      selectedPerson: null
    });
  }

  deletePerson = (id) => {
    this.props.firestore.delete({collection: 'people', doc: id})
    this.setState({
      selectedPerson: null
    })
  }


  render() {
    let formState = this.state.formVisible
    if (this.state.selectedPerson != null) {
      let person = this.state.selectedPerson
      console.log(person)
      return (
        <ShowPerson 
        name={person.name}
        id={person.id}
        location={person.location}
        onEditPerson={this.handleEditingTicketInList} 
        deletePerson={this.deletePerson}
        onNewDreamCreation={this.handleAddingNewDreamToList}
        />
      )
      } else {
        return (
      <div>
        <p>Welcome to the dream world! Now in color!</p>
        <People 
          shoForm={this.showForm}
          formStatePassedDown={formState}
          onNewPersonCreation={this.handleAddingNewPersonToList}
          onPersonSelection={this.selectPerson}
        />
        {/* Dreams /> */}
      </div>
    )
    }
  }
}

DreamControl.propTypes = {
  mainPeopleList: PropTypes.object,
  mainDreamList: PropTypes.object
}
const mapStateToProps = state => {
  return {
  mainPeopleList: state.mainPeopleList,
  mainDreamList: state.mainDreamList
  }
}

DreamControl = connect(mapStateToProps)(DreamControl)

export default withFirestore(DreamControl);