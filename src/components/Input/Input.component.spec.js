import React from 'react';
import { shallow } from 'enzyme';

import Input from './Input.component';


describe('<Input />', () => {
  describe('methods', () => {

    describe('handleChange', () => {
      it('call this.props.onChange', () => {
        const onChangeMock = jest.fn();
        const event = {
          target: { value: 'test value' }
        };

        const wrapper = shallow(<Input onChange={onChangeMock} />);
        wrapper.find('input').simulate('change', event);
        expect(onChangeMock).toHaveBeenCalled();
      });
    });

    describe('handleKeyPress', () => {
      it('It should simulate keydown events', () => {
        const onKeyPress = jest.fn();
        const wrapper = shallow(<Input onKeyPress={onKeyPress} handleOnEnter={true} />);

        wrapper.find('input').simulate('keyPress', { keyCode: 13 });
        expect(onKeyPress).toHaveBeenCalled();
      });

      it('It should not call keypress if no handleOnEnter prop and keyPressed', () => {
        const onKeyPress = jest.fn();
        const wrapper = shallow(<Input onKeyPress={onKeyPress} handleOnEnter={false}  />);

        wrapper.find('input').simulate('keyPress', { keyCode: 33 });
        expect(onKeyPress).toHaveBeenCalled();
      });
    });
  });
});
