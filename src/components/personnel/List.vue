<template>
  <div class="index">
    <div class="content-head">
      <el-button type="text" @click="addPersonnel">新增</el-button>
      <el-button type="text" @click="importPersonnel">导入</el-button>
      <el-button type="text" @click="exportPersonnel">导出</el-button>
      <el-button type="text" style="color: red;" @click="deletePersonnel">删除</el-button>
    </div>
    <div class="comtent-list">
      <el-row :gutter="20">
        <el-col :span="6" style="padding:0px;text-align: left;">
          <div class="grid-content bg-purple comtent-list-left">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
            <el-tree class="filter-tree" :data="personnelData.structureList" :props="defaultProps"
                     default-expand-all :expand-on-click-node="false" @node-click="handleNodeClick"
                     :filter-node-method="filterNode" ref="tree" :render-content="renderContent">
            </el-tree>
          </div>
        </el-col>
        <el-col :span="18" style="padding:0px">
          <div class="grid-content bg-purple comtent-list-right">
            <el-table :data="personnelData.list" border>
              <el-table-column label="编号" width="140">
                <template scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.code }}</span>
                </template>
              </el-table-column>
              <el-table-column label="性别" width="80">
                <template scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.sex }}</span>
                </template>
              </el-table-column>
              <el-table-column label="姓名" width="80">
                <template scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="出生年月" width="120">
                <template scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.birthday }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="tag" label="职位" width="100" filter-placement="bottom-end"
                               :filter-method="filterTag"
                               :filters="[{ text: '全部', value: '0' }, { text: '教师', value: '1' }, { text: '学生', value: '3' }]">
                <template scope="scope">
                  <el-tag :type="scope.row.tag === '全部' ? 'primary' : 'success'" close-transition>
                    {{scope.row.position}}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="联系电话" width="135">
                <template scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.phone }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template scope="scope">
                  <el-button size="small" @click="personnelModify">修改</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="comtent-paging">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="personnelListData.current" :page-sizes="[50, 100, 200]"
                           :page-size="personnelListData.pageSize" layout="sizes, prev, pager, next"
                           :total="personnelListData.total"></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="订单详情" :visible.sync="personnelModal" size="tiny" :before-close="cancel">
      <el-form ref="form" :model="personnelForm" label-width="90px">
        <el-form-item label="编号:" prop="code">
          <el-input type="text" v-model="personnelForm.code"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-input type="text" v-model="personnelForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="姓名:" prop="name">
          <el-input type="text" v-model="personnelForm.name" number></el-input>
        </el-form-item>
        <el-form-item label="出生日期:" prop="birthday">
          <el-input type="text" v-model="personnelForm.birthday" number></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="pesition">
          <el-select v-model="personnelForm.position" placeholder="请选择" style="min-width: 300px;">
            <el-option v-for="item in personnelData.positions" :key="item.value" :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="紧急联系人:" prop="contacts">
          <el-input type="text" v-model="personnelForm.contacts" number></el-input>
        </el-form-item>
        <el-form-item label="联系电话:" prop="phone">
          <el-input type="text" v-model="personnelForm.phone" number></el-input>
        </el-form-item>
        <el-form-item label="组织结构:" prop="structure">
          <el-input type="text" v-model="personnelForm.structure" number></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="min-width: 300px;float: right;" @click="personnelSubmit('personnelForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    created () {
      this.defaultActive.index = '/personnel/list'
      this.initStructureListData() // 获取组织结构
      this.initPositionsData()
      this.initPersonnelListData()
    },
    computed: {
      ...mapGetters([
        'personnelData',
        'defaultActive'
      ])
    },
    data () {
      return {
        personnelModal: false,
        modalTitle: '标题',
        personnelForm: {
          url: null,
          id: null,
          code: null, // 编号
          sex: null, // 性别
          name: null, // 姓名
          birthday: null, // 生日
          position: null, // 职位
          contacts: null, // 紧急联系人
          phone: null, // 联系电话
          structure: null // 组织
        },
        personnelListData: {
          pageSize: 50,
          current: 1,
          total: 1
        },
        filterText: '', // 结构过滤
        defaultProps: { // 结构默认字段
          children: 'children',
          label: 'label'
        },
        personnelRule: {
          name: [
            {required: true, message: '请填写名称!', trigger: 'blur'}
          ],
          site: [
            {required: true, message: '请填写连接!', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'initPositionsData',
        'initPersonnelListData',
        'initStructureListData'
      ]),
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      append (store, data) {
        console.log('append')
      },
      renderContent (h, {node, data, store}) {
        return h('span',
          [
            h('span', [h('span', node.label)]),
            h('span', {style: {'float': 'right', 'margin-right': '20px'}},
              [
                h('el-button', {attrs: {size: 'mini'}, on: {click: () => this.structureModify(store, data)}}, '修改')
              ]
            )
          ]
        )
      },
      handleSizeChange (val) {
      },
      handleCurrentChange (val) {
      },
      formatter (row) {
        return row.address
      },
      filterTag (value, row) {
        return row.tag === value
      },
      addPersonnel () { // 人员新增
        this.personnelModal = true
      },
      personnelModify () { // 人员修改
        this.personnelModal = true
      },
      importPersonnel () { // 导入人员
        console.log('导入人员数据')
      },
      exportPersonnel () { // 导出人员
        console.log('导出人员数据')
      },
      deletePersonnel () { // 删除人员
        console.log('删除人员')
      },
      structureModify (store, data) { // 组织结构修改按钮
        console.log(data)
        console.log('组织结构修改')
      },
      handleNodeClick(data) { // 组织结构节点点击执行
        console.log(data)
      },
      personnelSubmit () { // 表单提交
        axios({
          method: 'POST',
          url: this.personnelForm.url,
          params: {}
        }).then(function (response) {
          if (response.data) {

          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      cancel () { // 点击取消清空表单
        this.personnelModal = false
      }
    }
  }
</script>
<style lang="scss" scoped>
  .content-head {
    width: 160px;
    padding-bottom: 10px;
  }

  .comtent-paging {
    padding-top: 20px;
    position: absolute;
    right: 10px;
  }

  .comtent-list-left {
    min-height: 65vh;
    margin-left: 10px;
  }

  .comtent-list-right {
    margin-right: 10px;
  }

</style>
