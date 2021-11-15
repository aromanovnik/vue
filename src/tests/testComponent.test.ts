// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from '@vue/test-utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from '@jest/globals';

import TestComponent from '../components/TestComponent.vue';

// eslint-disable-next-line
describe('TestComponent', () => {
  test('Content from Props', () => {
    const wrapper = mount(TestComponent, {
      propsData: {
        message: 'Hello from test!',
      },
    });

    expect(wrapper.text()).toEqual('The message is: Hello from test!');
  });
});
