<template>
    <!--页头-->
    <div class="uk-block uk-block-primary uk-contrast page-header">
      <div class="uk-container-center">
        <h1 class="uk-heading-large">{{ header }}
          <small v-if="subHeader">{{ subHeader }}</small>
        </h1>
      </div>
    </div>
    <!--页头-->
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['header', 'subHeader']
  }
</script>
