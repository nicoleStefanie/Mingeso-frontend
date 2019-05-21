<template>
  <div class="content">
    <div class="md-layout">
   </div>
 </div>
</template>

<script>
import {
  UserCard
} from '../pages'

export default{
  components: {
    UserCard
  },
  data () {
    return {

      }
    },
  mounted: function(){
    /*this.$http.get('https://api.myjson.com/bins/ia9sc')
    .then(response => {
      this.data = response.body
      this.presidente = this.data[0]
      var i;
      for(i = 1; i < this.data.length; i++){
        this.ministros.push(this.data[i])
      }
    })*/
  }
}
</script>
