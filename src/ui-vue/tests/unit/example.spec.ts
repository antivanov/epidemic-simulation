import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import World from '@/components/World.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(World, {
      propsData: { msg }
    });
    expect(wrapper.text()).to.include(msg);
  });
});
