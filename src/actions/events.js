import { sessionInfo } from '../selectors/session'
import { authToken } from '../selectors/auth'
import api from '../api'

const camelCase = s => s.replace(/_([a-z])/g, g => g[1].toUpperCase())
const queryParam = (p, {query}) => query[p] ? query[p] : null
const ipInfo = (info, {ipInfo}) => ipInfo ? ipInfo[info] || null : null
const browserInfo = (info, {browser}) => (
  typeof browser === 'string' ? null
  : browser[info] || null
)

function getDateTime() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const f = v => v < 10 ? '0' + v : v
  return {
    local: `${year}-${f(month)}-${f(day)} ${f(hours)}:${f(minutes)}:${f(seconds)}`,
    utcDateTime: date.toISOString().slice(0, 19).replace('T', ' '),
    utcDate: date.toISOString().slice(0, 10)
  }
}

function utmExtraValues({query}) {
  return Object.getOwnPropertyNames(query)
    .filter(param => param.startsWith('utm_') && param !== 'utm_campaign')
    .reduce((r, p) => (r[camelCase(p)] = query[p], r), {})
}

function extraValues(session) {
  const extra = [
    {
      name: 'userCountry',
      value: ipInfo('country', session)
    },
    {
      name: 'userId',
      value: session.userId
    },
    {
      name: 'browserName',
      value: browserInfo('name', session)
    },
    {
      name: 'browserVersion',
      value: browserInfo('version', session)
    },
    {
      name: 'browserOS',
      value: browserInfo('os', session)
    }
  ]
  return extra.reduce((r, v) => {
    if (v.value) {
      r[v.name] = v.value
    }
    return r
  }, {})
}

export const changeFilterEvent = (f, v) => ({
  name: 'change_filter',
  data: {
    filterName: f,
    filterValue: v
  }
})

export const clickOfferEvent = (id, name) => ({
  name: 'click_offer',
  data: {
    partnerId: id,
    partnerName: name
  }
})

export const offerDetailsEvent = (id, name) => ({
  name: 'offer_details',
  data: {
    partnerId: id,
    partnerName: name
  }
})

export const enterLandingEvent = () => ({
  name: 'enter_langing'
})

export const changeDirectionEvent = (direction) => ({
  name: 'change_direction',
  data: {direction}
})

export function makeFullEvent(event, {session}) {
  const datetime = getDateTime()
  return {
    eventName: event.name,
    yClickId: queryParam('yclick_id', session),
    clientId: session.clientId || null,
    utmCampaign: queryParam('utm_campaign', session),
    utmExtraValues: utmExtraValues(session),
    eventExtraValues: event.data,
    eventDate: datetime.utcDate,
    eventDateTime: datetime.utcDateTime,
    userIP: ipInfo('ip', session),
    userCity: ipInfo('city', session),
    userRegion: ipInfo('region', session),
    userLocalTime: datetime.local,
    extraValues: extraValues(session),
    eventVersion: 1
  }
}

export function sendEvent(event) {
  return async (dispatch, getState) => {
    const state = getState()
    const token = authToken(state)
    const fullEvent = makeFullEvent(event, state)
    if (token === null) {
      try {
        const status = await api.events.send(fullEvent)
        console.log(status)
      } catch (error) {
        console.error(error)
      }
    } else {
      console.log('NOTE: Skipping sending events for admins')
    }
  }
}
