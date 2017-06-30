import React from 'react';
import renderer from 'react-test-renderer';

import PageTitle from './PageTitle';

describe('PageTitle', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <PageTitle title="Hello" />,
    ).toJSON();

    console.log(JSON.stringify(tree));


    expect(tree.type).toBe('h1');
    expect(tree.children).toEqual(['Hello']);
  });
});
