import React from 'react';
import App from './App';
import {shallow,mount} from 'enzyme';


describe("App", () => {
  const enzyme = require("enzyme");
  const Adapter = require("enzyme-adapter-react-16");
  enzyme.configure({ adapter: new Adapter() });

  let wrapper = "";

  beforeEach(() => {
    wrapper = shallow(<App/>);
  });

  it("calls method for get new sentence when mounted",() =>{
      let wrapper = mount(<App/>);
      let spy = spyOn(wrapper.instance(), 'getSentence');
      wrapper.instance().componentDidMount();
      expect(spy).toHaveBeenCalled();
  });

  it("renders anything if indicators are not processed yet",() =>{
    wrapper.instance().state.indicators="";
    expect(wrapper.find(".container").exists()).toEqual(false);
  });

  it("renders something if indicators are processed",() =>{
    wrapper.instance().state.indicators=[];
    wrapper.instance().forceUpdate();
    expect(wrapper.find(".container").exists()).toEqual(true);
  });

  it("renders UI correctly", () =>{
    wrapper.instance().state.indicators = true;
    wrapper.instance().state.author = "author";
    wrapper.instance().state.content = "content";
    wrapper.instance().forceUpdate();
    expect(wrapper.find(".user").text().toString()).toEqual(wrapper.instance().state.author);
    expect(wrapper.find(".sentence").text().toString()).toEqual(wrapper.instance().state.content);
  })

  it("calls method getSentence and sendSentence when submit",async () =>{
    let clickedItems = ["1","2"];
    let spy = spyOn(wrapper.instance(), 'sendSentence');
    let spy2 = spyOn(wrapper.instance(), 'getSentence');
    await wrapper.instance().handleSubmit(clickedItems);
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  })

  it("changes disable value when calling changeDisable() method",() =>{
    wrapper.instance().state.disable=false;
    wrapper.instance().changeDisable();
    expect(wrapper.instance().state.disable).toEqual(true);
    wrapper.instance().changeDisable();
    expect(wrapper.instance().state.disable).toEqual(false);
  })

  it("sets state correctly when gets new sentence",async function(done) {
    const mockSuccessResponse = {
      "id": "1",
      "content": "Se parli così è perchè non capisci un cazzo come tutti i ginecologi!",
      "author": "rado",
      "votes": [],
      "indicators": [
        0,
        1
      ]
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    wrapper.instance().getSentence();

    process.nextTick(() => {
      expect(wrapper.instance().state.sentenceId).toEqual("1");
      expect(wrapper.instance().state.author).toEqual("rado");
      expect(wrapper.instance().state.content)
          .toEqual("Se parli così è perchè non capisci un cazzo come tutti i ginecologi!");
      expect(wrapper.instance().state.indicators).toEqual([
        0,
        1
      ]);
      global.fetch.mockClear();
      done();
    })
  })
});