import React from 'react';
import {shallow} from 'enzyme';
import AbuseArea from "./AbuseArea";


describe("CheckBoxArea", () => {
    let props = {
        sendSentence: (value) => {
        }
    }
    const enzyme = require("enzyme");
    const Adapter = require("enzyme-adapter-react-16");
    enzyme.configure({ adapter: new Adapter() });

    it("adds value when checkbox is selected", () => {
        let wrapper = shallow(<AbuseArea/>);
        const value = "2";
        wrapper.instance().state.checkBoxClicked=["1"];
        let array = wrapper.instance().handleDivSelected(value);
        expect(array).toEqual(["1","2"]);
    });

    it("removes value when checkbox is unselected", () => {
        let wrapper = shallow(<AbuseArea/>);
        const value = "2";
        wrapper.instance().state.checkBoxClicked=["1","2"];
        let array = wrapper.instance().handleDivUnselected(value);
        expect(array).toEqual(["1"]);
    });

    xit("resets clicked checkboxes when user press button", () =>{
        let wrapper = shallow(<AbuseArea/>);
        wrapper.instance().state.checkboxes=["1","2","3","4"];
        let spy1 = spyOn(wrapper.instance(), 'uncheckAllCheckBoxes');
        let spy2 = spyOn(props, 'sendSentence');
        let array = wrapper.instance().sendCategories();
        expect(array).toEqual([]);
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    })
});
