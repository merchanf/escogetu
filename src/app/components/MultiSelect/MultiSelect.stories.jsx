/* eslint-disable no-console */
import React from 'react';
import MultiSelect from './MultiSelect';

export default {
  component: MultiSelect,
  title: 'MultiSelect',
};

const onChange = (data) => {
  console.log('data', data);
};

const options = [
  'Option 1',
  'Option 2 long',
  'Option 3',
  'Option 4 long long long',
  'Opt',
  'Option 6 long long',
];

export const Default = () => <MultiSelect onChange={onChange} options={options} />;
