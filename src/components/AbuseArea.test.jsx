import React from 'react';
import {shallow} from 'enzyme';
import AbuseArea from "./AbuseArea";


describe("AbuseArea", () => {
    let props = {
        disable:null,
        sendSentence:  () => {
             jest.fn()},
        changeDisable : () => {
            jest.fn()}
        }
        ;
    const enzyme = require("enzyme");
    const Adapter = require("enzyme-adapter-react-16");
    enzyme.configure({ adapter: new Adapter() });

    it("changes value of a checkbox", () =>{
        let wrapper = shallow(<AbuseArea/>);
        wrapper.instance().state.items =
            [
                {
                    value: 0,
                    title: 'OSCENO',
                    desc: 'Offese, insulti, attacchi personali, ecc.',
                    imageGrey: "../images/osceno/grey.svg",
                    checked: false
                },
                {
                    value: 1,
                    title: 'MINACCIA',
                    desc: 'Violenza, minacce, provocazioni, ecc.',
                    imageGrey: "../images/minaccia/grey.svg",
                    checked: false
                },
                {
                    value: 2,
                    title: 'INSULTO',
                    desc: 'Parolacce, riferimenti al sesso, ecc.',
                    imageGrey: "../images/insulto/grey.svg",
                    checked: false
                },
                {
                    value: 3,
                    title: 'RAZZIALE',
                    desc: 'Riferimenti ad etnie, luoghi comuni regionali, ecc.',
                    imageGrey: "../images/razziale/grey.svg",
                    checked: false
                }
            ];
        wrapper.setProps({ disable: false });
        wrapper.instance().onChange(1);
        expect(wrapper.instance().state.items[1].checked).toEqual(true)
        });

    it("uncheck all selected divs",() =>{
        let wrapper = shallow(<AbuseArea {...props}/>);
        wrapper.instance().state.items =
            [
                {
                    value: 0,
                    title: 'OSCENO',
                    desc: 'Offese, insulti, attacchi personali, ecc.',
                    imageGrey: "../images/osceno/grey.svg",
                    checked: true
                },
                {
                    value: 1,
                    title: 'MINACCIA',
                    desc: 'Violenza, minacce, provocazioni, ecc.',
                    imageGrey: "../images/minaccia/grey.svg",
                    checked: true
                },
                {
                    value: 2,
                    title: 'INSULTO',
                    desc: 'Parolacce, riferimenti al sesso, ecc.',
                    imageGrey: "../images/insulto/grey.svg",
                    checked: true
                },
                {
                    value: 3,
                    title: 'RAZZIALE',
                    desc: 'Riferimenti ad etnie, luoghi comuni regionali, ecc.',
                    imageGrey: "../images/razziale/grey.svg",
                    checked: true
                }
            ];
        let items = wrapper.instance().sendCategories();
        items.map((item) => expect(item.checked).toEqual(false));
    });
});
