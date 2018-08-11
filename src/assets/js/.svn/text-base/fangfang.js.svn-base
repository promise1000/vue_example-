import Vue from 'vue'
// 获取父元素对象
function getParentObj (data, activeId) {
  let rootObj = {}
  let cacheArray = []
  rootObj['Id'] = '0'
  rootObj['Lev'] = 0
  rootObj['ParentId'] = '0'
  rootObj['Name'] = 'Device Management'
  rootObj['Children'] = data
  function recursion (data) {
    if (data.Children.some(value => value.Id === activeId)) {
      cacheArray.push(data)
      return
    }
    var isM = data.Children.filter(value => {
      return value.Children.length > 0
    })
    for (var item of isM) {
      recursion(item)
    }
  }
  recursion(rootObj)
  if (cacheArray.length <= 0) {
    return rootObj
  } else {
    return cacheArray[0]
  }
}
export default {
  getParentObj,
  // 保存之后的回调，刷新列表
  backSuccess (axios, state, responseA) {
    axios.get('orgnodes/0/en')
      .then(responseB => {
        let savedata = responseB.data
        var obj = getParentObj(savedata, state.leftId)
        state.targetnodeMsg.Lev = obj.Lev + 2
        state.targetnodeMsg = {
          Lev: state.targetnodeMsg.Lev,
          TmplTypeId: state.targetnodeMsg.TmplTypeId,
          ParentOrgId: state.targetnodeMsg.ParentOrgId,
          PreSiblingOrgId: 0,
          Owner: 1
        }
        state.leftdata = responseB.data
        state.templateActive = responseA.data.Id
        let active = state.menuActive.split('e')
        active[0] === '' && (active[0] = '2')
        let activeArr = []
        for (var i = 0; i < active.length; i++) {
          var item = ''
          for (var j = 0; j <= i; j++) {
            item += j > 0 ? ('e' + active[j]) : (active[j])
          }
          activeArr.push(item)
        }
        state.cacheMenu = activeArr
        state.history = state.template.common.Basicparam[0].value.en
      })
      .catch(error => {
        if (typeof error.response === 'undefined') {
        }
      })
    if (responseA.data.status === '200') {
    }
  },
  // 修改之node前方法
  modifyBefore (state, leftdata) {
    let updateObj = getParentObj(leftdata, state.leftId)
    state.targetnodeMsg.Lev = updateObj.Lev + 1
    state.targetnodeMsg.ParentOrgId = updateObj.Id
    state.targetnodeMsg = {
      Lev: updateObj.Lev + 1,
      TmplTypeId: state.targetnodeMsg.TmplTypeId,
      ParentOrgId: updateObj.Id,
      PreSiblingOrgId: 0,
      Owner: 1
    }
  },
  // 更新node成功之后刷新列表
  updated (axios, state) {
    axios.get('orgnodes/0/en')
      .then(responseB => {
        state.leftdata = responseB.data
        state.templateActive = state.leftId
        let active = state.menuActive.split('e')
        active[0] === '' && (active[0] = '2')
        let activeArr = []
        for (var i = 0; i < active.length; i++) {
          var item = ''
          for (var j = 0; j <= i; j++) {
            item += j > 0 ? ('e' + active[j]) : (active[j])
          }
          activeArr.push(item)
        }
        state.cacheMenu = activeArr
        state.history = state.template.common.Basicparam[0].value.en
      })
      .catch(error => {
        if (typeof error.response === 'undefined') {
        }
      })
  },

  // 添加equip成功之后
  saveEquip (axios, state, responseA) {
    axios.get('equips/en/' + state.leftId)
      .then(responseB => {
        Vue.set(state.addMenus, 'i' + state.leftId, responseB.data)
        state.templateActive = responseA.data.Id
        let active = state.menuActive.split('e')
        active[0] === '' && (active[0] = '2')
        let activeArr = []
        for (var i = 0; i < active.length; i++) {
          var item = ''
          for (var j = 0; j <= i; j++) {
            item += j > 0 ? ('e' + active[j]) : (active[j])
          }
          activeArr.push(item)
        }
        state.cacheMenu = activeArr
        state.history = state.template.common.Basicparam[0].value.en
      })
      .catch(error => {
        if (typeof error.response === 'undefined') {
        }
      })
  },
  // 修改equip 成功之后 刷新列表
  updateEquip (axios, state) {
    axios.get('equips/en/' + state.leftId)
      .then(responseB => {
        Vue.set(state.addMenus, 'i' + state.leftId, responseB.data)
        let active = state.menuActive.split('e')
        active[0] === '' && (active[0] = '2')
        let activeArr = []
        for (var i = 0; i < active.length; i++) {
          var item = ''
          for (var j = 0; j <= i; j++) {
            item += j > 0 ? ('e' + active[j]) : (active[j])
          }
          activeArr.push(item)
        }
        state.cacheMenu = activeArr
        state.history = state.template.common.Basicparam[0].value.en
      })
      .catch(error => {
        if (typeof error.response === 'undefined') {
        }
      })
  }

}
