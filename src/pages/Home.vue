<template>
  <div class="container">
        <md-card>
          <md-card-header data-background-color="green" style="position: relative;">
            <h2 class="title">HOTEL MINGESO</h2>
          </md-card-header>
          <md-card-content>
             <div class="md-card-avatar">
                   <div class="md-layout-item md-size-100">
                        <div class="places-buttons text-center"></div>
                  </div>
             </div>
          </md-card-content>
        </md-card>
    </div>
</template>

<script>
/* eslint-disable */
export default{
  name: 'Home',
  props: {
    dataBackgroundColor: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
h2.title{
  text-align:center;
}
</style>
