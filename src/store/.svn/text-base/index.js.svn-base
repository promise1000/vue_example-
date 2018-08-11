import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import fang from '../assets/js/fangfang'
Vue.use(vuex)
Vue.use(router)

export default new vuex.Store({
  state: {
    /** ↓↓↓↓↓ ↓↓↓↓↓***↓↓↓↓↓************************************************************** for xierong use ***************************************************************************** **/
    // 账户信息
    Account: '',
    // upload image时的图片
    fileList: [],
    img: '',
    icon: '0',
    errorMsg: '',
    logo: '',
    // 登陆状态
    logined: false,
    // 用户信息
    user: {name: '', password: ''},
    token: {},
    fullscreenLoading: false,
    datarefresh: 0,
    tempaltename: [],
    changeflag: false,
    saveflag: true,
    localLang: 'en',
    // nodeid:creat org时，当前org模板的ID(从topbar 选模板时的点击事件中获取)
    nodeId: 1,
    // equipId：crate equip时 当前equip模板的ID(从topbar 选模板时的点击事件中获取)
    equipId: 1,
    // leftId: 如果左侧menu 被选中的为org节点，将当前节点的ID传入(从左侧menu的点击事件中获取)
    leftId: 0,
    // leftitemID: 如果左侧 mebu 被选中的为equip 将当前节点ID传入(从左侧menu的点击事件中获取)
    leftitemid: '',
    // 被选中的节点类型(新增节点时从Topbar 的点击事件传入,拿到左侧被点击的节点信息时从左侧点击事件传入)
    nodeType: 'Org',
    // create node 时，新建节点的定位信息
    targetnodeMsg: {
      // 节点的层级，左侧menu 点击时传入
      Lev: 1,
      // 模板类型id，选择模板时传入
      TmplTypeId: 1,
      // 父节点的id，左侧menu 点击时传入
      ParentOrgId: 0,
      // 上一个兄弟节点的id，左侧menu 点击时传入
      PreSiblingOrgId: 0,
      Owner: 1
    },
    // 保存equip 时将要被保存到后台的equip的信息
    saveMsg: {},
    // 保存 org 时将要被保存到后台的org的信息
    savenodeMsg: {},
    // flag 用于辨识是保存状态还是更新状态
    saveclick: '',
    langid: '',
    // 被渲染到前端的模板
    template: {},
    rules: {
      name: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ],
      description: [
        { required: true, message: '请填写描述', trigger: 'blur' }
      ]
    },
    iconimg: ['org.svg', 'organization.svg', 'devices.svg', 'equipment.svg', '风机.svg', '鼓风机.svg', '水泵1.svg', '补水泵.svg', '湿帘水泵.svg', '河道水位站.svg', '工厂.svg', '公园.svg', '公园1.svg', '研究.svg', '地区.svg', '农村供水工程.svg', '仪表盘.svg', '仪表盘2.svg', '设备.svg', '水电站.svg', '供电网点.svg'],
    /** ↓↓↓↓↓ ↓↓↓↓↓***↓↓↓↓↓**************************************************************  for fangfang use ***************************************************************************** **/
    orgTemplateDetail: {},
    // node模板detail
    temGroupDetail: [],
    // equip模板detail
    temGroupEquip: [],
    cacheMenu: [],
    templateActive: 'node#-2',
    addMenus: {},
    menuActive: '',
    history: '',
    leftdata: [],
    TmplId: '',
    isShow: true,
    groupindex: '',
    equipindex: '',
    toplist: [],
    // group模板
    nodetem: {
      groupnode: []
    },
    equipnode: [],
    equipData: [],
    currentId: '',
    viewChange: true
  },
  mutations: {
    onViewChange (state, bool) {
      state.viewChange = bool
    },
    // node detail
    onOrgTemplateDetail (state, temdata) {
      let temGroupList = []
      for (let items of temdata.Ex) {
        let paramList = items.ParamList
        for (let item of paramList) {
          let obj = {}
          obj['DisplayName'] = item.DisplayName
          obj['Desc'] = item.Desc
          temGroupList.push(obj)
        }
      }
      state.temGroupDetail = temGroupList
    },
    // equip detail
    onTemGroupEquip (state, equipDetail) {
      let array = []
      for (let items of equipDetail) {
        let paramlist = items.ParamList
        for (let item of paramlist) {
          let obj = {}
          obj['equipparam'] = item.equipparam
          obj['equipparamdesclang'] = item.equipparamdesclang
          array.push(obj)
        }
      }
      state.temGroupEquip = array
    },
    // 展开列表
    onCatchMenu (state, opens) {
      opens.length > 0 && (state.cacheMenu = opens)
    },
    tagNodeMsg (state, tagnodemsg) {
      state.targetnodeMsg = tagnodemsg
    },
    onNodeType (state, type) {
      state.nodeType = type
    },
    onTemplateActive (state, id) {
      state.templateActive = id
    },
    leftData (state, nodeData) {
      state.leftdata = nodeData
    },
    onMenuActive (state, index) {
      state.menuActive = index
    },
    onAddMenus (state, obj) {
      Vue.set(state.addMenus, obj.id, obj.data)
    },
    addHistorys (state, name) {
      state.history = name
    },
    changeequipid: function (state, id) {
      state.equipId = id
    },
    groupIndex: function (state, index) {
      state.groupindex = index
      // state.nodeId = index
    },
    equipIndex: function (state, index) {
      state.equipindex = index
    },
    getEquipmet: function (state, equipdata) {
      state.nodetem.equipData = equipdata
    },
    groupId: function (state, groupid) {
      state.nodeId = groupid
    },
    isshow: function (state, bool) {
      state.isShow = bool
    },
    leftid: function (state, leftId) {
      state.leftId = leftId
    },
    leftitemid: function (state, itemid) {
      state.leftitemid = itemid
    },
    getNodeGroup: function (state, nodedata) {
      let arr = []
      for (let i = 0, icount = nodedata.length; i < icount; i++) {
        let obj = {id: '', name: '', image: '', detail: ''}
        obj.name = nodedata[i].Name
        obj.detail = nodedata[i].Desc
        obj.id = nodedata[i].Id
        arr.push(obj)
      }
      state.nodetem.groupnode = arr
    },
    topbardata: function (state, topid) {
      state.toplist.push(topid)
    },
    addequipment: function (state, equipdata) {
      let arr = []
      for (let i = 0, icount = equipdata.length; i < icount; i++) {
        let obj = {id: '', name: '', equiptypeid: '', type: ''}
        obj.name = equipdata[i].equiptypename
        obj.type = equipdata[i].srptype
        obj.equiptypeid = equipdata[i].equiptypeid
        obj.id = equipdata[i].accountid
        arr.push(obj)
      }
      state.equipnode = arr
    },
    /** ↑↑↑↑***↑↑↑↑***↑↑↑↑****↑↑↑↑*******************************************************  by fangfang ***************************************************************************** **/
    /** ↓↓↓↓↓ ↓↓↓↓↓***↓↓↓↓↓**************************************************************  by xierong ***************************************************************************** **/
    setLogin (state) {
      state.logined = true
    },
    setLogOut (state) {
      state.logined = false
    },
    setToken (state, obj) {
      state.token = obj
    },
    setUser (state, userObj) {
      state.user = userObj
    },
    setLoading (state) {
      state.fullscreenLoading = false
    },
    setFinish (state) {
      state.fullscreenLoading = false
    },
    changeimg (state, img) {
      state.img = img
    },
    clear (state) {
      state.template = {}
      state.errorMsg = ''
    },
    reset (state) {
      state.img = ''
      state.icon = '0'
    },
    changeerror (state, error) {
      state.errorMsg = error
    },
    deleteimg (state) {
      state.img = ''
    },
    changeDataRefresh (state) {
      state.datarefresh = 1
    },
    changeError (state, data) {
      state.template.common.Basicparam[data[0]].errormsg = data[1]
    },
    changeflag (state) {
      // alert('change')
      state.changeflag = true
      // state.template.render.test.push(0)
    },
    saveflag (state) {
      state.saveflag = false
    },
    changelang (state, lang) {
      state.localLang = lang
    },
    changeError1 (state, data) {
      state.template.render[data[0]][data[1]].errormsg = data[2]
      state.template.render.test.push(0)
      // alert(state.template.render[data[0]][data[1]].errormsg)
    },
    findindex (state, name) {
      let arr = state.iconimg
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === name) {
          state.icon = i
        }
      }
    },
    updatename (state, value) {
      state.template.common.Basicparam[0].value.en = value
    },
    updatedescription (state, value) {
      state.template.common.Basicparam[1].value.en = value
    },
    updateCommon (state, value) {
      state.template.common = value
    },
    // handleRemove (sate, fileList) {
    //   console.log('1')
    // },
    // handlePreview (state, file) {
    //   // file.imgflag = !file.imgflag
    //   // console.log(file)
    // },
    mlclick: function (state, target) {
      let e = target[0]
      let bp = target[1]
      let index = target[2]
      // console.log(e, bp, index)
      state.template[e][bp][index].mlshow = true
      state.template.render.test.push('0')
    },
    changeml: function (state) {
      state.showml.show = false
      state.mldata[state.mlparam].zh_cn = state.ml.zh_cn
      state.mldata[state.mlparam].zh_tw = state.ml.zh_tw
      state.mldata[state.mlparam].Japanese = state.ml.Japanese
      state.template.render.test.push('0')
      // console.log(state.mldata)
    },
    mlClose: function (state, target) {
      let e = target[0]
      let bp = target[1]
      let index = target[2]
      // console.log(e, bp, index)
      state.template[e][bp][index].mlshow = false
      state.template[e][bp][index]['save'] = false
      state.template.render.test.push('0')
    },
    mlOk: function (state, target) {
      let e = target[0]
      let bp = target[1]
      let index = target[2]
      // console.log(e, bp, index)
      state.template[e][bp][index].mlshow = false
      state.template[e][bp][index]['save'] = true
      state.template.render.test.push('0')
    },
    create: function (state, type) {
      // ///////////////////////////////////////////
      state.fullscreenLoading = true
      state.changeflag = false
      state.saveflag = true
      state.template = {}
      state.errorMsg = ''
      setTimeout(() => {
        state.errorMsg = 'Loading...'
      }, 2000)
      let url
      if (type === 'Org') {
        let nodeid = state.nodeId
        url = 'orgnode_tmpls/findone/' + nodeid + '/en'
        axios.get(url)
          .then(response => {
            // console.log(response)
            createnode(state, response.data)
            // self.$store.commit('createnode', response.data)
            // this.$store.commit('changelevel')
            // self.$router.push({path: '/createnode'})
            state.fullscreenLoading = false
          })
          .catch(error => {
            if (typeof error.response === 'undefined' || state.template === '') {
              state.errorMsg = '404 Not Found!'
              state.fullscreenLoading = false
            }
          })
      } else {
        let equipid = state.equipId
        let orgid
        if (state.leftId === '') {
          orgid = state.Account.orgid
        } else {
          orgid = state.leftId
        }
        url = 'equips/en/GetEquipTemplate/' + orgid + '/' + equipid
        axios.get(url)
          .then(response => {
            createequip(state, response.data)
            // self.$store.commit('createequip', response.data)
            // self.$router.push({path: '/createnode'})
            state.fullscreenLoading = false
          })
          .catch(error => {
            this.$store.state.template = {}
            if (typeof error.response === 'undefined' && state.template === '') {
              state.errorMsg = '404 Not Found!'
              state.fullscreenLoading = false
            }
          })
      }
      function createnode (state, data) {
        state.saveclick = 0
        state.img = data.Logo || ''
        if (!data.Logo || data.Logo === '') {
          data.Logo = 'equipment.svg'
        }
        state.template = {
          common: {
            Basicparam: [
              {param: 'Nodename', htmltype: 1, options: [], value: {en: '', zh_cn: '', zh_tw: ''}, placeholder: 'AdvantechGroup', ml: false, errormsg: ''},
              {param: 'NodeDescription', htmltype: 1, options: [], value: {en: '', zh_cn: '', zh_tw: ''}, placeholder: 'EMS and iWater of Advantech Factories', ml: true, mlshow: false, errormsg: ''},
              {param: 'icon', htmltype: 2, options: [], value: {en: data.Logo, zh_cn: '', zh_tw: ''}, placeholder: 'EMS and iWater of Advantech Factories', ml: false, errormsg: ''}
            ]
          },
          render: {
            test: []
          }
        }
        state.savenodeMsg = {Name: '', Desc: '', Img: state.img || '', Lev: '', TmplTypeId: state.nodeId, ParentOrgId: '', PreSiblingOrgId: '', Logo: '', Owner: '1', CreateTime: '', Ex: []}
        for (let j = 0; j < data.Ex.length; j++) {
          state.tempaltename = data.Ex[j].DisplayName
          let paramlist = data.Ex[j].ParamList
          let arr = []
          for (let i = 0; i < paramlist.length; i++) {
            let obj2 = {PName: '', PNameLangId: '', PGroupName: '', PGroupNameLangId: '', IsMultiLang: '', PValue: {en: '', zh_cn: '', zh_tw: ''}}
            let obj = {groupname: {en: ''}, param: {en: ''}, htmltype: '', options: [], value: {en: '', zh_cn: '', zh_tw: ''}, placeholder: '', ml: '', mlshow: '', errormsg: ''}
            // obj.param.en = paramlist[i].DisplayName
            obj.groupname.en = data.Ex[j].GroupName || {en: ''}
            obj.param.en = paramlist[i].Name || {en: ''}
            obj.htmltype = paramlist[i].HtmlType || 1
            if (paramlist[i].Value) {
              obj.value.en = paramlist[i].Value
            }
            obj.placeholder = paramlist[i].DefaultValue
            obj2.PNameLangId = paramlist[i].NameLangId
            obj2.PName = paramlist[i].Name
            obj2.PGroupName = data.Ex[j].GroupName
            obj2.PGroupNameLangId = data.Ex[j].GroupNameLangId
            obj2.IsMultiLang = paramlist[i].IsMultiLang || false
            if (paramlist[i].IsMultiLang) {
              obj.ml = true
              obj.mlshow = false
            }
            arr.push(obj)
            state.savenodeMsg.Ex.push(obj2)
          }
          state.template.render[state.tempaltename] = arr
          state.template.render.test.push('0')
        // console.log(state.template.render[state.tempaltename])
        }
      }
      function createequip (state, data) {
        state.saveclick = 0
        state.img = data.EquipInfo.equipimg
        state.template = {
          common: {
            Basicparam: [
              {param: 'Nodename', htmltype: 1, options: [], value: {en: '', zh_cn: '', zh_tw: ''}, placeholder: 'AdvantechGroup', ml: false, errormsg: ''},
              {param: 'NodeDescription', htmltype: 1, options: [], value: {en: '', zh_cn: '', zh_tw: ''}, placeholder: 'EMS and iWater of Advantech Factories', ml: true, mlshow: false, errormsg: ''},
              {param: 'icon', htmltype: 1, options: [], value: {en: 'devices.svg', zh_cn: '', zh_tw: ''}, placeholder: 'EMS and iWater of Advantech Factories', ml: false, errormsg: ''}
            ]
          },
          render: {
            test: []
          }
        }
        for (let j = 0; j < data.EquipInfoEx.length; j++) {
          state.tempaltename = data.EquipInfoEx[j].DisplayName
          // console.log(data.EquipInfoEx[j].DisplayName)
          let paramlist = data.EquipInfoEx[j].ParamList
          let arr = []
          for (let i = 0; i < paramlist.length; i++) {
            let obj = {groupname: {en: ''}, param: {en: ''}, htmltype: '', options: [], value: {en: '', zh_cn: '', zh_tw: ''}, placeholder: '', ml: '', mlshow: '', errormsg: ''}
            obj.param.en = paramlist[i].equipparamname
            obj.groupname.en = data.EquipInfoEx[j].DisplayName || {en: ''}
            obj.htmltype = paramlist[i].equipparamhtmltype || 1
            obj.value.en = paramlist[i].equipparamvaluelang.en
            obj.value.zh_cn = paramlist[i].equipparamvaluelang.zh_cn
            obj.value.zh_tw = paramlist[i].equipparamvaluelang.zh_tw
            if (paramlist[i].islangid) {
              paramlist[i].equipparamvalue = 1
              // paramlist[i].equipparamvaluelang = {en: '', zh_cn: '', zh_tw: ''}
              obj.ml = true
              obj.mlshow = false
            }
            paramlist[i].equipparamvalue = -1
            obj.placeholder = paramlist[i].equipparamnamelang.en
            arr.push(obj)
          }
          state.template.render[state.tempaltename] = arr
          state.template.render.test.push('0')
        }
        state.saveMsg = data
        // console.log(state.saveMsg)
      }
    },
    edit: function (state) {
      state.changeflag = false
      state.saveflag = true
      state.template = {}
      state.datarefresh = 0
      state.errorMsg = ''
      // alert(state.nodeType)
      state.fullscreenLoading = true
      setTimeout(() => {
        state.errorMsg = 'Loading...'
      }, 2000)
      if (state.nodeType === 'Org') {
        let nodeid = state.leftId
        let url = 'orgnodes/findone/' + nodeid + '/en'
        axios.get(url)
          .then(response => {
          // console.log(response)
            editnode(state, response.data)
            // this.$store.commit('editnode', response.data)
            // self.$router.push({path: '/createnode'})
            state.fullscreenLoading = false
          })
          .catch(error => {
            if (typeof error.response === 'undefined' && state.template === {}) {
              state.errorMsg = '404 Not Found!'
              state.fullscreenLoading = false
            }
          })
      } else {
        let equipid = state.leftitemid
        // let orgid = state.Account.orgid
        // console.log("equipID："+equipid )
        let url = 'equips/en/findone/' + equipid
        axios.get(url)
          .then(response => {
            // console.log(response)
            // self.$store.commit('reset')
            editequip(state, response.data)
            // self.$router.push({path: '/createnode'})
            state.fullscreenLoading = false
          })
          .catch(error => {
            if (typeof error.response === 'undefined' && state.template === '') {
              state.errorMsg = '404 Not Found!'
              state.fullscreenLoading = false
            }
          })
      }
      function editnode (state, data) {
        state.saveclick = 1
        state.img = data.Img
        if (data.Logo === '' || !data.Logo) {
          data.Logo = 'equipment.svg'
        }
        state.template = {
          common: {
            Basicparam: [
              {param: 'Nodename', htmltype: 1, options: [], value: {en: data.Name.en, zh_cn: '', zh_tw: ''}, placeholder: 'AdvantechGroup', ml: false, errormsg: ''},
              {param: 'NodeDescription', htmltype: 1, options: [], value: {en: data.Desc.en, zh_cn: data.Desc.zh_cn, zh_tw: data.Desc.zh_tw}, placeholder: 'EMS and iWater of Advantech Factories', ml: true, mlshow: false, errormsg: ''},
              {param: 'icon', htmltype: 2, options: [], value: {en: data.Logo, zh_cn: '', zh_tw: ''}, placeholder: 'EMS and iWater of Advantech Factories', ml: false, errormsg: ''}
            ]
          },
          render: {
            test: []
          }
        }
        // console.log(data)
        state.savenodeMsg = {Name: '', Desc: '', Img: state.img, Lev: '', TmplTypeId: state.nodeId, ParentOrgId: '', PreSiblingOrgId: '', Logo: '', Owner: '1', CreateTime: '', Ex: []}
        for (let j = 0; j < data.Ex.length; j++) {
          state.tempaltename = data.Ex[j].DisplayName
          let paramlist = data.Ex[j].ParamList
          let arr = []
          for (let i = 0; i < paramlist.length; i++) {
            let obj2 = {PName: '', PGroupName: '', PGroupNameLangId: '', PValue: {en: '', zh_cn: '', zh_tw: ''}}
            let obj = {groupname: {}, param: {}, htmltype: '', options: [], value: {en: '', zh_cn: '', zh_tw: ''}, ml: '', mlshow: '', errormsg: ''}
            obj.param = paramlist[i].Name || {en: '', zh_cn: '', zh_tw: ''}
            obj.htmltype = paramlist[i].HtmlType || 1
            obj.groupname = data.Ex[j].GroupName || {en: '', zh_cn: '', zh_tw: ''}
            obj.value.en = paramlist[i].Value.en || ''
            obj.value.zh_cn = paramlist[i].Value.zh_cn
            obj.value.zh_tw = paramlist[i].Value.zh_tw
            obj2.PName = paramlist[i].Name[state.localLang]
            obj2.PGroupName = data.Ex[j].GroupName.en
            obj2.IsMultiLang = paramlist[i].IsMultiLang || false
            obj2.PGroupNameLangId = data.Ex[j].GroupNameLangId
            if (paramlist[i].IsMultiLang) {
              obj.ml = true
              obj.mlshow = false
            }
            arr.push(obj)
            state.savenodeMsg.Ex.push(obj2)
          }
          state.template.render[state.tempaltename] = arr
          state.template.render.test.push('0')
        }
      }
      function editequip (state, data) {
        state.saveclick = 1
        state.img = data.EquipInfo.equipimg
        state.template = {
          common: {
            Basicparam: [
              {param: 'Nodename', htmltype: 1, options: [], value: {en: data.EquipInfo.equipname, zh_cn: '', zh_tw: ''}, placeholder: 'AdvantechGroup', ml: false, errormsg: ''},
              {param: 'NodeDescription', htmltype: 1, options: [], value: {en: data.EquipInfo.equipdesclang.en, zh_cn: data.EquipInfo.equipdesclang.zh_cn, zh_tw: data.EquipInfo.equipdesclang.zh_tw}, placeholder: 'EMS and iWater of Advantech Factories', ml: true, mlshow: false, errormsg: ''},
              {param: 'Icon', htmltype: 2, options: [], value: {en: 'devices.svg', zh_cn: '', zh_tw: ''}, placeholder: 'EMS and iWater of Advantech Factories', ml: false, errormsg: ''}
            ]
          },
          render: {
            test: []
          }
        }
        for (let j = 0; j < data.EquipInfoEx.length; j++) {
          state.tempaltename = data.EquipInfoEx[j].DisplayName
          let paramlist = data.EquipInfoEx[j].ParamList
          let arr = []
          for (let i = 0; i < paramlist.length; i++) {
            let obj = {groupname: {en: ''}, param: {en: ''}, htmltype: '', options: [], value: {en: '', zh_cn: '', zh_tw: ''}, placeholder: '', ml: '', mlshow: '', errormsg: ''}
            obj.param.en = paramlist[i].equipparamname
            obj.groupname.en = data.EquipInfoEx[j].DisplayName
            obj.htmltype = paramlist[i].equipparamhtmltype || 1
            obj.value.en = paramlist[i].equipparamvaluelang.en
            obj.value.zh_cn = paramlist[i].equipparamvaluelang.zh_cn
            obj.value.zh_tw = paramlist[i].equipparamvaluelang.zh_tw
            if (paramlist[i].islangid) {
              paramlist[i].equipparamvalue = 1
              paramlist[i].equipparamvaluelang = {en: '', zh_cn: '', zh_tw: ''}
              obj.ml = true
              obj.mlshow = false
            }
            paramlist[i].equipparamvalue = -1
            obj.placeholder = paramlist[i].equipparamnamelang.en
            arr.push(obj)
          }
          state.template.render[state.tempaltename] = arr
          state.template.render.test.push('0')
        }
        state.saveMsg = data
      }
    },
    save: function (state) {
      if (state.changeflag && state.saveflag) {
        let self = this
        if (state.nodeType === 'Org') {
          if (state.saveclick === 0) {
            savenode(state, self)
          } else {
            putnode(state)
          }
        } else if (state.nodeType === 'equipment') {
          if (state.saveclick === 0) {
            saveequip(state, self)
          } else {
            putequip(state)
          }
        }
      }
      function savenode (state, self) {
        state.isShow = true
        state.savenodeMsg['Name'] = state.template.common.Basicparam[0].value
        state.savenodeMsg['Desc'] = state.template.common.Basicparam[1].value
        state.savenodeMsg['Img'] = state.img || ''
        state.savenodeMsg['Lev'] = state.targetnodeMsg.Lev
        state.savenodeMsg['TmplTypeId'] = state.targetnodeMsg.TmplTypeId
        state.savenodeMsg['ParentOrgId'] = state.leftId
        state.savenodeMsg['PreSiblingOrgId'] = state.targetnodeMsg.PreSiblingOrgId
        // console.log(state.targetnodeMsg.Owner)
        state.savenodeMsg['Owner'] = state.targetnodeMsg.Owner
        state.savenodeMsg.Logo = state.template.common.Basicparam[2].value.en || ''
        let myDate = formatDate(new Date())
        state.savenodeMsg['CreateTime'] = myDate
        let render = state.template.render
        let flag = -1
        for (let key in render) {
          if (key !== 'test') {
            for (let i = 0; i < render[key].length; i++) {
              flag = flag + 1
              if (render[key][i].ml === true) {
                if (render[key][i].save === false) {
                  render[key][i].value.zh_cn = ''
                  render[key][i].value.zh_tw = ''
                }
              }
              state.savenodeMsg['Ex'][flag]['PValue'] = render[key][i].value
              // else {
            // state.savenodeMsg['Ex'][flag]['PValue'] = render[key][i].value.en
            }
          }
        }
        // console.log(state.savenodeMsg)
        // console.log(state.savenodeMsg)
        axios.post('orgnodes/create/0', qs.stringify(state.savenodeMsg))
          .then(responseA => {
            state.fullscreenLoading = false
            state.leftId = responseA.data.Id
            state.saveclick = 1
            // 成功回调后芳芳的代码.刷新左侧的列表
            fang.backSuccess(axios, state, responseA, self)
            // self.commit('edit')
          })
          .catch(error => {
            if (typeof error.response === 'undefined') {
              state.errorMsg = '404 Not Found!'
            }
          })
        function formatDate (now) {
          var year = now.getFullYear()
          var month = now.getMonth() + 1
          var date = now.getDate()
          var hour = now.getHours()
          var minute = now.getMinutes()
          var second = now.getSeconds()
          return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
        }
      }
      function saveequip (state, self) {
        state.saveMsg.EquipInfo.equipname = state.template.common.Basicparam[0].value.en
        state.saveMsg.EquipInfo.equipdesclang = state.template.common.Basicparam[1].value
        state.saveMsg.EquipInfo.orgid = state.leftId
        state.saveMsg.EquipInfo.equipserialno = 2
        state.saveMsg.EquipInfo.equipimg = state.img
        let render = state.template.render
        for (let k = 0; k < state.saveMsg.EquipDevice.length; k++) {
          state.saveMsg.EquipDevice[k].devid = 88
        }
        for (let j = 0; j < state.saveMsg.DeviceTagInfo.length; j++) {
          state.saveMsg.DeviceTagInfo[j].devid = 88
        }
        let flag = -1
        for (let key in render) {
          if (key !== 'test') {
            flag = flag + 1
            for (let i = 0; i < render[key].length; i++) {
            // if (render[key][i].save === true) {
              console.log('flag:' + flag + 'i:' + i)
              state.saveMsg.EquipInfoEx[flag].ParamList[i].equipparamvaluelang = render[key][i].value
            // }
            }
          }
        }
        let obj = {EquipInfo: state.saveMsg.EquipInfo,
          EquipInfoEx: state.saveMsg.EquipInfoEx,
          DeviceTagInfo: state.saveMsg.DeviceTagInfo,
          TagAlmCfg: state.saveMsg.TagAlmCfg,
          EquipDevice: state.saveMsg.EquipDevice}
        axios.post('equips/en/createequip/' + state.leftId, qs.stringify(obj))
          .then(responseA => {
            state.fullscreenLoading = false
            state.saveclick = 1
            state.leftitemid = responseA.data.Id
            state.saveMsg.EquipInfo.equipdesclangid = responseA.data.equipdesclangid
            state.equipId = responseA.data.Id
            state.leftitemid = responseA.data.Id
            // ////////////////////////
            fang.saveEquip(axios, state, responseA, self)
            // self.commit('edit')
            if (responseA.data.status === '200') {
            }
          })
          .catch(error => {
            if (typeof error.response === 'undefined') {
              state.errorMsg = '404 Not Found!'
            }
          })
      }
      function putnode (state) {
        // ////////////////////////
        fang.modifyBefore(state, state.leftdata)
        state.savenodeMsg['Name'] = state.template.common.Basicparam[0].value
        state.savenodeMsg['Desc'] = state.template.common.Basicparam[1].value
        state.savenodeMsg['Img'] = state.img || ''
        state.savenodeMsg['Logo'] = state.icon || ''
        state.savenodeMsg['Lev'] = state.targetnodeMsg.Lev
        state.savenodeMsg['TmplTypeId'] = state.targetnodeMsg.TmplTypeId
        state.savenodeMsg['ParentOrgId'] = state.targetnodeMsg.ParentOrgId
        state.savenodeMsg['PreSiblingOrgId'] = state.targetnodeMsg.PreSiblingOrgId
        state.savenodeMsg['Owner'] = state.targetnodeMsg.Owner
        state.savenodeMsg.Logo = state.template.common.Basicparam[2].value.en
        let myDate = formatDate(new Date())
        state.savenodeMsg['CreateTime'] = myDate
        let render = state.template.render
        console.log(render)
        let flag = -1
        for (let key in render) {
          if (key !== 'test') {
            for (let i = 0; i < render[key].length; i++) {
              flag = flag + 1
              if (render[key][i].ml === true) {
                if (render[key][i].save === false) {
                  render[key][i].value.zh_cn = ''
                  render[key][i].value.zh_tw = ''
                }
              }
              state.savenodeMsg['Ex'][flag]['PValue'] = render[key][i].value
              // else {
              // state.savenodeMsg['Ex'][flag]['PValue'] = render[key][i].value.en
              // }
            }
          }
        }
        let obj = {CreateTime: state.savenodeMsg.CreateTime,
          Desc: state.savenodeMsg.Desc,
          Ex: state.savenodeMsg.Ex,
          Img: state.savenodeMsg.Img,
          Lev: state.savenodeMsg.Lev,
          Logo: state.savenodeMsg.Logo,
          Name: state.savenodeMsg.Name,
          Owner: state.savenodeMsg.Owner,
          ParentOrgId: state.savenodeMsg.ParentOrgId,
          PreSiblingOrgId: state.savenodeMsg.PreSiblingOrgId,
          TmplTypeId: state.savenodeMsg.TmplTypeId
        }
        let url = 'orgnodes/update/' + state.leftId
        if (obj.Ex.length === 0) {
          obj.Ex = '[]'
        }
        axios.post(url, qs.stringify(obj))
          .then(responseA => {
            state.fullscreenLoading = false
            // // 更新调用fangfang的方法
            fang.updated(axios, state)
          })
          .catch(error => {
            if (typeof error.response === 'undefined') {
              state.errorMsg = '404 Not Found!'
            }
          })
        function formatDate (now) {
          var year = now.getFullYear()
          var month = now.getMonth() + 1
          var date = now.getDate()
          var hour = now.getHours()
          var minute = now.getMinutes()
          var second = now.getSeconds()
          return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
        }
      }
      function putequip (state) {
        state.saveMsg.EquipInfo.equipname = state.template.common.Basicparam[0].value.en
        state.saveMsg.EquipInfo.equipdesclang = state.template.common.Basicparam[1].value
        state.saveMsg.EquipInfo.equipid = state.leftitemid
        state.saveMsg.EquipInfo.orgid = state.leftId
        state.saveMsg.EquipInfo.equipimg = state.img
        for (let k = 0; k < state.saveMsg.EquipInfoEx.length; k++) {
          for (let n = 0; n < state.saveMsg.EquipInfoEx[k].ParamList.length; n++) {
            state.saveMsg.EquipInfoEx[k].ParamList[n].equipid = state.leftitemid
          }
        }
        let render = state.template.render
        let flag = -1
        for (let key in render) {
          if (key !== 'test') {
            flag = flag + 1
            for (let i = 0; i < render[key].length; i++) {
              state.saveMsg.EquipInfoEx[flag].ParamList[i].equipparamvaluelang = render[key][i].value
            }
          }
        }
        let obj = {
          EquipInfo: state.saveMsg.EquipInfo,
          EquipInfoEx: state.saveMsg.EquipInfoEx,
          DeviceTagInfo: [],
          TagAlmCfg: state.saveMsg.TagAlmCfg,
          EquipDevice: state.saveMsg.EquipDevice}
        // http://rd-haolj:3000/
        let url = 'equips/en/EditEquip/' + state.leftitemid
        axios.post(url, qs.stringify(obj))
          .then(responseA => {
            state.fullscreenLoading = false
            // 编辑equip成功之后调用fangfang 的方法
            fang.updateEquip(axios, state)
          })
          .catch(error => {
            if (typeof error.response === 'undefined') {
              state.errorMsg = '404 Not Found!'
            }
          })
      }
    },
    delete: function (state) {
      let url
      if (state.nodeType === 'Org') {
        url = 'orgnodes/delete/' + state.leftId
        axios.post(url)
          .then(response => {
            // 删除需要加判断，是否删除成功，或者是有子项不允许删除
            // 根据不同的返回值，执行不同的逻辑
            // 删除node调用fangfang的方法
            let resultMsg = response.data.result
            // alert(resultMsg)
            if (resultMsg === 'There are subnodes that can not be deleted' || resultMsg === 'There are subdevices that can not be deleted') {
              alert('There are child elements that cannot be deleted')
            } else if (resultMsg === 'ok') {
              this.commit('deleteNote', state.leftId)
            }
          })
          .catch(error => {
            if (typeof error.response === 'undefined') {
              state.errorMsg = '404 Not Found!'
            }
          })
      }
      if (state.nodeType === 'equipment') {
        url = 'equips/en/DeleteEquip/' + state.leftitemid
        axios.post(url)
          .then(response => {
            // 删除equip调用fangfang的方法
            this.commit('deleteEquip')
            state.nodeType = 'Org'
          })
          .catch(error => {
            if (typeof error.response === 'undefined') {
              state.errorMsg = '404 Not Found!'
            }
          })
      }
    },
    // 删除node方法by fangfang
    deleteNote: function (state, id) {
      let obj = fang.getParentObj(state.leftdata, id)
      axios.get('orgnodes/0/en')
        .then(response => {
          state.leftdata = response.data
          state.templateActive = 'node#' + obj.Id
          state.leftId = obj.Id === '-2' ? '0' : obj.Id
          if (obj.Id === '-2' && state.viewChange === false) {
            state.viewChange = true
            state.history = ''
          } else {
            state.history = obj.Name
          }
          this.commit('edit')
          alert('Deleted Successfully!')
        })
        .catch(error => {
          if (typeof error.response === 'undefined') {
            state.errorMsg = '404 Not Found!'
          }
        })
    },
    // 删除equipment方法 by fangfang
    deleteEquip: function (state) {
      axios.get('equips/en/' + state.leftId)
        .then(response => {
          Vue.set(state.addMenus, 'i' + state.leftId, response.data)
          state.templateActive = 'node#' + state.leftId
          alert('Deleted Successfully')
          this.commit('edit')
          // console.log(fang.getSelfObj(state.leftdata, state.leftId))
          // if (state.leftId === '-2' && state.viewChange === false) {
          //   state.viewChange = true
          // }
          // state.history = fang.getSelfObj(state.leftdata, state.leftId).Name
        })
        .catch(error => {
          if (typeof error.response === 'undefined') {
            state.errorMsg = '404 Not Found!'
          }
        })
    }
  },
  actions: {
  }
})
