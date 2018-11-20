import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import mockAxios from "axios";

const mockGifs = [
  {
    caption: "happy very funny GIF by Disney Zootopia",
    id:"3NtY188QaxDdC",
    preview: "https://media3.giphy.com/media/3NtY188QaxDdC/giphy-preview.gif",
    rating: "g",
    slug: "3NtY188QaxDdC",
    src: "https://media3.giphy.com/media/3NtY188QaxDdC/giphy.gif",
    timeTrending: "2018-11-19 23:00:02",
  }, {
    caption:"bird no GIF by Cheezburger",
    id: "g69ZPJfLy7hD2",
    preview: "https://media3.giphy.com/media/g69ZPJfLy7hD2/giphy-preview.gif",
    rating: "g",
    slug: "cheezburger-no-bird-g69ZPJfLy7hD2",
    src: "https://media3.giphy.com/media/g69ZPJfLy7hD2/giphy.gif",
    timeTrending: "2017-08-19 22:45:01",
  }
];

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});


describe('methods', () => {

  describe('handlechange', () => {
    it('should set state of query', () => {
      const wrapper = shallow(<App />);
      const mockValue = 'test';

      wrapper.instance().handleChange(mockValue);
      expect(wrapper.instance().state.query).toBe(mockValue);
    });
  });

  describe('loadMoreGifs', () => {
    it('should offset query by 25 if passed in next', () => {
        const wrapper = shallow(<App />);

        wrapper.instance().loadMoreGifs('next');
        expect(wrapper.instance().state.offset).toBe(25);
    });

    it('should offset query by less than 25 Back', () => {
        const wrapper = shallow(<App />);
        const mockOffset = 75;
        wrapper.setState({
          offset: mockOffset
        })
        wrapper.instance().loadMoreGifs('back');
        expect(wrapper.instance().state.offset).toBe(mockOffset - 25);
    });

    it('should call searchGiphy()', () => {

      const wrapper = shallow(<App />);
      const spy = jest.spyOn(wrapper.instance(), 'searchGiphy');

      wrapper.instance().loadMoreGifs('next');
      expect(wrapper.instance().searchGiphy).toHaveBeenCalled();
    });

  });

  describe('sortByDate', () => {
    it('should sort by trending date', () => {

      const wrapper = shallow(<App />);
      wrapper.setState({
        gifs: mockGifs
      });

      wrapper.instance().sortByDate();

      expect(wrapper.instance().state.gifs[0].timeTrending).toBe("2017-08-19 22:45:01")
      expect(wrapper.instance().state.gifs[1].timeTrending).toBe("2018-11-19 23:00:02")
    });
  });
})
