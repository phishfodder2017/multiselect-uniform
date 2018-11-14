import React, { Component } from 'react';
import SimpleSchema from 'simpl-schema';
import Select from 'react-select';
import { 
  ErrorsField, AutoForm, ListField, ListItemField, NestField, TextField, SubmitField
  } from 'uniforms-bootstrap4';
import SelectField from './SelectField';

const ritem = new SimpleSchema({
  s: { type: String }
})
const sch = new SimpleSchema({
  text: { type: String },
  r: { type: Array },
  'r.$': { type: String }
})

const schSingle = new SimpleSchema({
  text: { type: String },
  r: { type: String }
})

export default class Hello extends Component {
  state = {
    counter: 0,
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  render() {
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ]
    return (
      <div>
        <button onClick={() => this.increment()}>Click Me</button>
        <p>You've pressed the button {this.state.counter} times.</p>
        R
        <Select isMulti={true} options={options}/>

        <br /> -- <br />
        {this.renderMulti()}
        
        <br /> -- <br />
        {this.renderSingle()}
      </div>
    );
  }
  showResultSingle(doc) {
    console.log('submit', doc);
    try {
      schSingle.validate(doc);
    } catch (e) {
      console.log('fail', e);
    }
  }
  showResult(doc) {
    console.log('submit', doc);
    try {
      sch.validate(doc);
    } catch (e) {
      console.log('fail', e);
    }
  }

  renderSingle() {
    
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ]
    const obj = {
      text: '',
      r: 'strawberry'
    }
    return (
    <AutoForm schema={schSingle} model = {obj} onSubmit={this.showResultSingle}>
      <TextField name='text' />
      R <SelectField name='r' isMulti={false} label={true} allowedValues={options} />
      <ErrorsField />
      <SubmitField />
    </AutoForm>)
  }

  renderMulti() {
    
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ]
    const obj = {
      text: '',
      r: ['vanilla']
    }
    return (
    <AutoForm schema={sch} model = {obj} onSubmit={this.showResult}>
      <TextField name='text' />
      R <SelectField name='r' isMulti={true} label={true} allowedValues={options} />
      <ErrorsField />
      <SubmitField />
    </AutoForm>)
  }
}
