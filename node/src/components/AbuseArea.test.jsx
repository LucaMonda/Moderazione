import React from 'react';
import {shallow,mount} from 'enzyme';
import AbuseArea from "./AbuseArea";

describe("AbuseArea", () => {

    let props = {
        disable:null,
        sendSentence:  () => {
             jest.fn()},
            indicators: [0,1],
        handleSubmit() {
            jest.fn()}
    };


    let spyDidMount = "";
    let wrapper = "";

    beforeEach(() => {
        spyDidMount = spyOn(AbuseArea.prototype, 'componentDidMount');
        wrapper = shallow(<AbuseArea {...props}/>);
    });


    const enzyme = require("enzyme");
    const Adapter = require("enzyme-adapter-react-16");
    enzyme.configure({ adapter: new Adapter() });

    it("changes value of a checkbox in handleClickItem", () =>{
        wrapper.setProps({ disable: false });
        wrapper.instance().handleClickItem(0);
        expect(wrapper.instance().state.items[0].checked).toEqual(true);
        wrapper.setProps({ disable: true });
        wrapper.instance().handleClickItem(0);
        expect(wrapper.instance().state.items[0].checked).toEqual(true);
        });

    it("renders button correctly", () =>{
        wrapper.setProps({disable:true});
        expect(wrapper.find(".send-info-button").text()).toEqual("AVANTI");
        expect(wrapper.find(".send-info-button").getElement().props.disabled).toEqual(true);
        wrapper.setProps({disable:false});
        expect(wrapper.find(".send-info-button").getElement().props.disabled).toEqual(false);
    });

    it("handleKeyboardEvent",() =>{
        let key=1;
        let spy = spyOn(wrapper.instance(),"handleClickItem");
        let spy2 = spyOn(wrapper.instance(),"handleClickButton");
        wrapper.instance().handleKeyboardEvent(key);
        expect(spy).toHaveBeenCalled();
        expect(spy2).not.toHaveBeenCalled();
        spy.calls.reset();
        key='enter';
        wrapper.instance().handleKeyboardEvent(key);
        expect(spy).not.toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });

    it("sets indicators correctly",() =>{
        wrapper.instance().setIndicators();
        expect(wrapper.instance().state.items[0].checked).toEqual(true);
        expect(wrapper.instance().state.items[1].checked).toEqual(true);
        expect(wrapper.instance().state.items[2].checked).toEqual(false);
        expect(wrapper.instance().state.items[3].checked).toEqual(false);
    });

    it("fills array with checked items correctly",() =>{
        let items = wrapper.instance().state.items;
        let itemsClicked = wrapper.instance().findCheckedItems(items);
        expect(itemsClicked.length).toEqual(0);
    });

    it("disables all items",() =>{
        wrapper.instance().disableItems();
        expect(wrapper.instance().state.items[0].checked).toEqual(false);
        expect(wrapper.instance().state.items[1].checked).toEqual(false);
        expect(wrapper.instance().state.items[2].checked).toEqual(false);
        expect(wrapper.instance().state.items[3].checked).toEqual(false);
    })
});
