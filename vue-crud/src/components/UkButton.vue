<template>
  <button :class=" {'uk-button': true,
        'uk-active': active,
        [`uk-width-${width}`]: width,
        'uk-button-primary': color === 'primary',
        'uk-button-success': color === 'success',
        'uk-button-danger': color === 'danger',
        'uk-button-link': color === 'link',
        'uk-button-mini': size === 'mini',
        'uk-button-small': size === 'small',
        'uk-button-large': size === 'large'}"
          @click="clickHandler($event)"
          :disabled="disabled"
          id="btn-delete"
  ><i :class="'uk-icon-'+this.icon"><span>{{text}}</span></i></button>
</template>
<script>
  export default {
    props: {
      active: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default: ''
      },
      icon: {
        type: String
      },
      size: {
        type: String,
        default: ''
      },
      width: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      }
    },
    methods: {
      clickHandler (e) {
        e.preventDefault()
        this.$emit('click')
      }
    }
  }
</script>
