import React, { Component }   from 'react';
import classnames   from 'classnames';
import connectField from 'uniforms/connectField';
import Select from 'react-select';

// className={classnames('ui', {disabled, required}, className, 'rating')}
const wrappedSelect = ({allowedValues, isMulti, disabled, label, required, value = [], onChange}) => {
    const loadSingleValueFunction = (initialValue) => 
        (typeof initialValue === 'string' && initialValue.length)
        ? allowedValues.find(option => option.value === initialValue)
        : null; // value
    const loadMultiValueFunction = (initialValues) =>
        allowedValues.filter(({value}) => initialValues.includes(value));
    const initial =
      isMulti
      ? loadMultiValueFunction(value)
      : loadSingleValueFunction(value);
    
    return <Select className={['primary']}
        options = {allowedValues}
        value={initial}
        // getOptionLabel={({label}) => label}
        // getOptionValue={({value}) => value}
        isMulti = {isMulti}
        onChange = { (selection, action) => {
            if (isMulti) {
                const result = [];
                selection.forEach(element => {
                    result.push(element.value)
                });
                onChange(result)
            } else {
                onChange(selection.value)
            }
        }}
    />
}

export default connectField(wrappedSelect);