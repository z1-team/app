import queryString from 'querystring'

const bannerId = {
  mw_all: 'bg0',
  m_all: 'bg1',
  w_all: 'bg6',
  m_18: 'bg2',
  m_25: 'bg3',
  m_35: 'bg4',
  m_45: 'bg5',
  w_18: 'bg7',
  w_25: 'bg8',
  w_35: 'bg9',
  w_45: 'bg10'
}

const definePlace = (fields, ipInfo, index = 0) => (
  ipInfo[fields[index]].length > 0 ? ipInfo[fields[index]]
   : index < fields.length - 1 ? definePlace(fields, ipInfo, index + 1)
    : 'Ваш город'
)

export const showPush = ({session}) => session.showPush

export const clientBanner = ({session}) => (
  session.query.utm_img ?
    bannerId[session.query.utm_img] || false : false
)

export const getCity = ({session}) => (
  session.ipInfo ? session.ipInfo.city : 'Ваш город'
)

export const getPlace = ({session}) => {
  const {ipInfo} = session
  const fields = ["city", "region", "country", "continent"]
  return ipInfo ? definePlace(fields, ipInfo) : 'Ваш город'
}

export const getLinksTail = ({session}) => {
  const {theme, query, userId, clientId} = session
  const queryParams = [
    ['yclid', 'yclick_id'],
    ['utm_campaign', 'utm_campaign'],
    ['utm_source', 'utm_source'],
    ['utm_gbid', 'utm_gbid'],
    ['utm_content', 'ad_id'],
    ['utm_term', 'utm_term'],
    ['utm_phrase', 'utm_phrase'],
    ['utm_region', 'utm_region'],
    ['utm_region_id', 'utm_region_id'],
    ['utm_age', 'utm_age'],
    ['utm_gender', 'utm_gender'],
    ['utm_device', 'utm_device']
  ]

  const tail = queryParams.reduce((tail, param) => {
    if (query[param[0]]) {
      tail[param[1]] = query[param[0]]
    }
    return tail
  }, {})

  if (userId) {
    tail.user_id = userId
  }

  if (clientId) {
    tail.client_id = clientId
  }

  if (theme) {
    tail.theme = theme
  }

  return queryString.stringify(tail)
}

export const getABTests = ({session}) => session.abTests

export const getClientId = ({session}) => session.clientId || null

export const showBot = ({session}) => {
  if(session.botTest.groupName) {
    return session.botTest.groupName === 'g1'
  }

  return false
}
