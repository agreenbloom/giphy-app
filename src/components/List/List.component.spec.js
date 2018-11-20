import React from 'react';
import ReactDOM from 'react-dom';
import List from './List.component';
import { shallow } from 'enzyme';

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
  const wrapper = shallow(<List gifs={mockGifs} />);

  expect(wrapper).toMatchSnapshot();
});


describe('methods', () => {
  beforeEach(() => {
    this.wrapper = shallow(<List gifs={mockGifs} />);
  });


});
