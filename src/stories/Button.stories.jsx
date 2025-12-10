import React from 'react';

export default {
  title: 'Example/Button',
  component: (props) => <button {...props}>{props.children || 'Button'}</button>,
};

export const Default = { args: { children: 'Hello Button' } };
