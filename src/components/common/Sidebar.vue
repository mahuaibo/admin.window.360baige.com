<template>
  <div class="common-sidebar">
    <div class="common-sidebar-list">
      <div class="menu-item" id="center" @click="handleClick('/application/center'),setStyle('center')" ref="center">
        <img src="../../assets/center.png" height="20" width="20"/>
        <label>应用中心</label>
      </div>
      <div class="menu-item" @click="handleClick('/account/list'),setStyle('accountList')" ref="accountList">
        <img src="../../assets/account.png" height="20" width="20"/>
        <label>账户信息</label>
      </div>
      <div class="menu-item" id="orderList" @click="handleClick('/order/list'),setStyle('orderList')" ref="orderList">
        <img src="../../assets/order.png" height="20" width="20"/>
        <label>订单信息</label>
      </div>
      <div class="menu-item" @click="handleClick('/logger/list'),setStyle('loggerList')" ref="loggerList">
        <img src="../../assets/operate.png" height="20" width="20"/>
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
        var hash = window.location.hash
        if (hash.indexOf('application') >= 0) {
          this.$refs.center.style.backgroundColor = '#4b5880'
          this.$refs.center.style.borderRight = '8px solid #69df8a'
          this.$refs.orderList.style.backgroundColor = this.$refs.loggerList.style.backgroundColor = this.$refs.accountList.style.backgroundColor = ''
          this.$refs.orderList.style.borderRight = this.$refs.loggerList.style.borderRight = this.$refs.accountList.style.borderRight = ''
        } else if (hash.indexOf('account') >= 0 || hash.indexOf('/account/transactionDetail') >= 0) {
          this.$refs.accountList.style.backgroundColor = '#4b5880'
          this.$refs.accountList.style.borderRight = '8px solid #69df8a'
          this.$refs.orderList.style.backgroundColor = this.$refs.loggerList.style.backgroundColor = this.$refs.center.style.backgroundColor = ''
          this.$refs.orderList.style.borderRight = this.$refs.loggerList.style.borderRight = this.$refs.center.style.borderRight = ''
        } else if (hash.indexOf('order') >= 0) {
          this.$refs.orderList.style.backgroundColor = '#4b5880'
          this.$refs.orderList.style.borderRight = '8px solid #69df8a'
          this.$refs.accountList.style.backgroundColor = this.$refs.loggerList.style.backgroundColor = this.$refs.center.style.backgroundColor = ''
          this.$refs.accountList.style.borderRight = this.$refs.loggerList.style.borderRight = this.$refs.center.style.borderRight = ''
        } else if (hash.indexOf('logger') >= 0) {
          this.$refs.loggerList.style.backgroundColor = '#4b5880'
          this.$refs.loggerList.style.borderRight = '8px solid #69df8a'
          this.$refs.accountList.style.backgroundColor = this.$refs.orderList.style.backgroundColor = this.$refs.center.style.backgroundColor = ''
          this.$refs.accountList.style.borderRight = this.$refs.orderList.style.borderRight = this.$refs.center.style.borderRight = ''
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .common-sidebar {
    .common-sidebar-list{
      color:#ffffff;font-size: 16px;
    }
    .menu-item {
      height: 70px;
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
  }
</style>
