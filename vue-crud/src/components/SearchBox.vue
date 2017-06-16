<template>
  <div class="uk-form">
    <div class="uk-form-icon">
      <i class="uk-icon-search"></i>
      <input type="search"
             :placeholder="placeholder"
             :value="terms"
             class="search-box uk-form-width-large"
             @keyup.enter="$emit('search', $event.target.value)"/>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'SearchBox',
    props: ['terms', 'placeholder']
  }
</script>
