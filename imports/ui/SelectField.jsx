import React, { Component }   from 'react';
import classnames   from 'classnames';
import connectField from 'uniforms/connectField';
import Select from 'react-select';

// className={classnames('ui', {disabled, required}, className, 'rating')}
const wrappedSelect = ({allowedValues, isMulti, disabled, label, required, value = [], onChange}) =>
    <Select className={['primary']}
    options = {allowedValues}
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
    }}/>
;

export default connectField(wrappedSelect);