import type { Directive, DirectiveBinding } from 'vue'


export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const date = new Date(binding.value);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    el.textContent = date.toLocaleDateString(undefined, options);
  },
} as Directive;
