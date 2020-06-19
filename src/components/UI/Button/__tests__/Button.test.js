import React from 'react';
import { shallow } from 'enzyme';
import {
  StyleSheet,
  Text,
} from 'react-native';

import Button from '../Button';
import {
  PRIMARY_BTN_TEXT_COLOR,
  SECONDARY_BTN_COLOR,
  GREEN,
} from '../../UikitUtils/colors';
import { findByTestAttr } from '../../../../utils/testUtils';

describe('<Button /> render tests', () => {
  it('It should render the primary button with text', () => {
    const component = shallow(<Button primary>{'test'}</Button>);
    const Text = component.find('Text');
    // console.log('Text: ', Text.debug({verbose: true}))

    const styleProp = Text.prop('style');
    const style = StyleSheet.flatten(styleProp);
    
    expect(Text).toHaveLength(1);
    expect(style.color).toEqual(PRIMARY_BTN_TEXT_COLOR);
  })

  it('It should render the secondary button with text', () => {
    const component = shallow(<Button secondary>{'test'}</Button>);
    const styleProp = component.prop('style');
    const style = StyleSheet.flatten(styleProp);
    expect(style.backgroundColor).toEqual(SECONDARY_BTN_COLOR);
  })

  it('It should render the success button with text', () => {
    const component = shallow(<Button success>{'test'}</Button>);
    const styleProp = component.prop('style');
    const style = StyleSheet.flatten(styleProp);
    expect(style.backgroundColor).toEqual(GREEN);
  })


  it('It should be able to overide the style of existing button', () => {
    const borderRadius = 12;
    const component = shallow(<Button overideStyle={{borderRadius}}>{'test'}</Button>);
    const styleProp = component.prop('style');
    const style = StyleSheet.flatten(styleProp);
    expect(style.borderRadius).toEqual(borderRadius);
  })

  it('It should be able to render any child component', () => {
    const testAttr = 'child';
    const component = shallow(
      <Button>
        <Text data-test={testAttr}>
          {'test'}
        </Text>
      </Button>
    );
    const childElement = findByTestAttr(component, testAttr);
    expect(childElement.length).toBe(1);
  })

});

describe('<Button /> functionality test', () => {
  it('It should have called the onClick function only once', () => {
    const mockCallback = jest.fn();
    const component = shallow(
      <Button onClick={mockCallback}>
        {'test'}
      </Button>
    );
    component.simulate('click');
    const onClickCount = mockCallback.mock.calls.length;
    expect(onClickCount).toBe(1);
  })
})

