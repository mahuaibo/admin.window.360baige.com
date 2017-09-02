<template>
  <div class="common-sidebar">
    <div style="color:#ffffff;font-size: 16px;">
      <div class="menu-item" id="center" @click="handleClick('/application/center'),setStyle('center')" ref="center">
        <img src="../../assets/logo.png" height="25" width="25"/>
        <label>应用中心</label>
      </div>
      <div class="menu-item" @click="handleClick('/account/list'),setStyle('accountList')" ref="accountList">
        <img src="../../assets/logo.png" height="25" width="25"/>
        <label>账户信息</label>
      </div>
      <div class="menu-item" @click="handleClick('/order/list'),setStyle('orderList')" ref="orderList">
        <img src="../../assets/logo.png" height="25" width="25"/>
        <label>订单信息</label>
      </div>
      <div class="menu-item" @click="handleClick('/logger/list'),setStyle('loggerList')" ref="loggerList">
        <img src="../../assets/logo.png" height="25" width="25"/>
        <label>操作日志</label>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    mounted () {
      this.setStyle()
    },
    computed: {
      ...mapGetters([])
    },
    methods: {
      ...mapActions([
        'handleClick'
      ]),
      setStyle () {
        var setStyleObject = this.$refs
        var href = window.location.href
        if (href.indexOf('/application/center') >= 0 || href.indexOf('/application/store') >= 0 || href.indexOf('/application/appTplDetail') >= 0) {
          setStyleObject = this.$refs.center
          this.$refs.orderList.style.backgroundColor = this.$refs.loggerList.style.backgroundColor = this.$refs.accountList.style.backgroundColor = ''
          this.$refs.orderList.style.borderRight = this.$refs.loggerList.style.borderRight = this.$refs.accountList.style.borderRight = ''
        } else if (href.indexOf('/account/list') >= 0 || href.indexOf('/account/transactionDetail') >= 0) {
          setStyleObject = this.$refs.accountList
          this.$refs.orderList.style.backgroundColor = this.$refs.loggerList.style.backgroundColor = this.$refs.center.style.backgroundColor = ''
          this.$refs.orderList.style.borderRight = this.$refs.loggerList.style.borderRight = this.$refs.center.style.borderRight = ''
        } else if (href.indexOf('/order/list') >= 0) {
          setStyleObject = this.$refs.orderList
          this.$refs.accountList.style.backgroundColor = this.$refs.loggerList.style.backgroundColor = this.$refs.center.style.backgroundColor = ''
          this.$refs.accountList.style.borderRight = this.$refs.loggerList.style.borderRight = this.$refs.center.style.borderRight = ''
        } else if (href.indexOf('/logger/list') >= 0) {
          setStyleObject = this.$refs.loggerList
          this.$refs.accountList.style.backgroundColor = this.$refs.orderList.style.backgroundColor = this.$refs.center.style.backgroundColor = ''
          this.$refs.accountList.style.borderRight = this.$refs.orderList.style.borderRight = this.$refs.center.style.borderRight = ''
        }
        setStyleObject.style.backgroundColor = '#4b5880'
        setStyleObject.style.borderRight = '8px solid #69df8a'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .menu-item {
    height: 70px;
    width: 238px;
    text-align: left;
    padding-left: 34px;
    line-height: 70px;
    img {
      vertical-align: middle;
    }
    label {
      margin-left: 17px;
    }
  }

  .menu-item:hover {
    background-color: #4b5880;
    border-right: 8px solid #69df8a;
  }

</style>
