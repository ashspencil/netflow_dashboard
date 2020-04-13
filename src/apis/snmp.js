import axios from 'axios'

export function getifAdminStatus (options) {
  let apiOptions = {}
  if (options) {
    apiOptions['params'] = options
  }
  return axios.get('api/v1/snmpwalk/ifadminstatus', apiOptions)
}

export function getifOperStatus (options) {
  let apiOptions = {}
  if (options) {
    apiOptions['params'] = options
  }
  return axios.get('api/v1/snmpwalk/ifoperstatus', apiOptions)
}

export function getifOperSuspendedStatus (options) {
  let apiOptions = {}
  if (options) {
    apiOptions['params'] = options
  }
  return axios.get('api/v1/snmpwalk/ifopersuspendedstatus', apiOptions)
}

export function getSnmpWalkAll (options) {
  let apiOptions = {}
  if (options) {
    apiOptions['params'] = options
  }
  return axios.get('api/v1/snmpwalk/all', apiOptions)
}

export function updateStatus (options) {
  let apiOptions = {}
  if (options) {
    apiOptions['params'] = options
  }
  return axios.put('api/v1/snmpset/status', apiOptions)
}
