import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import World from '@/components/StateModelView.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(World);
    expect(wrapper.text()).to.include('State model');
  });
});
