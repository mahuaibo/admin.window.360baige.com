<template>
  <div class="index">
    <div class="content-head"></div>
    <div class="comtent-list">
      <el-steps :space="100" direction="vertical" :active="1">
        <el-step title="快件到达：北京市海淀区分拣中心"></el-step>
      </el-steps>
    </div>
  </div>
</template>
<script>
  //  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    computed: {
      ...mapGetters([])
    },
    data () {
      return {}
    },
    methods: {
      ...mapActions([])
    }
  }
</script>
<style>
  .content-head {
    padding-bottom: 10px;
  }
</style>
