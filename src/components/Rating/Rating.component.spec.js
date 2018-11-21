import React from 'react';
import { shallow } from 'enzyme';
import Rating from './Rating.component';

describe(' Rating component', () => {
  it('Test click event', () => {
    const mockCallBack = jest.fn();

    const wrapper = shallow((<Rating totalStars={3}/>));
    wrapper.instance().change(1);

    expect(wrapper.instance().state.starsSelected).toEqual(1);
  });
});
