var APIUrl = null
var SSOUrl = null
var TechUrl = null
var SSOVersion = null
var DashboardUrl = null
var mode = process.env.NODE_ENV
// var axios = require('axios')
var Version = 'v1.5'

if (mode === 'production') {
  APIUrl = 'https://portal-devicecloud.wise-paas.com/'
  SSOUrl = 'tokenvalidation' + Version
  SSOVersion = Version
} else {
  APIUrl = 'https://portal-devicecloud.wise-paas.com/' // 'http://rd-jingsa:3030/'
  SSOUrl = 'https://portal-sso.wise-paas.com/' + Version
  SSOVersion = Version
}

// function _getUrl (cb) {
//   axios.get(APIUrl + '/_info').then((res) => {
//     return cb(res.data.sso, res.data.tech, res.data.dashboard)
//   }).catch((error) => {
//     console.log(error)
//   })
// }

export default {
  APIUrl: APIUrl,
  SSOUrl: SSOUrl,
  TECHUrl: TechUrl,
  DashboardUrl: DashboardUrl,
  SSOVersion: SSOVersion,
  // getUrl: _getUrl,
  mode: mode,
  ValidSSO: true,
  Scope: {
    GetValue: 'get_value',
    EditValue: 'edit_value',
    EditConfig: 'edit_config',
    ManageAccount: 'manage_account'
  },
  SSORole: {
    Admin: 'admin',
    Tenant: 'tenant',
    User: 'develop',
    Srp: 'srpUser'
  }
}
