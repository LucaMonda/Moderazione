import React from 'react';
import App from './App';
import {shallow} from 'enzyme';


describe("App", () => {
  const enzyme = require("enzyme");
  const Adapter = require("enzyme-adapter-react-16");
  enzyme.configure({ adapter: new Adapter() });

  it("builds object correctly to send to server", () => {
    let wrapper = shallow(<App/>);
    const array = ["1","2"];
    wrapper.instance().state.sentenceId = "1";
    let obj = wrapper.instance().sendSentence(array);
    expect(obj.categories).toEqual(array);
    expect(obj.id).toEqual(wrapper.instance().state.sentenceId);
  });

});
