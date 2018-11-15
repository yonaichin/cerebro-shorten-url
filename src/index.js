import { bitly_token } from '../config.json'
import logo from '../icon.png'

export const fn = ({ term, display, actions }) => {
  const regx = /^short /g

  if (regx.test(term)) {
    const query = term.split(' ')[1]
    const onKeyDown = onKeyDownHandler(query)(actions)
    display({
      title: 'Shorten Url via Bitly',
      icon: logo,
      onSelect: event => event.preventDefault(),
      onKeyDown
    })
  }
}

const onKeyDownHandler = query => actions => async event => {
  switch (event.keyCode) {
    case 27:
      actions.hideWindow()
      break
    case 13:
      event.preventDefault()
      if (query !== '') {
        actions.replaceTerm('Shortening...')
        try {
          const url = await search(query)
          actions.replaceTerm('Shortened and Copied!')
          actions.copyToClipboard(url)
          await wait(0.5)
          actions.hideWindow()

        } catch (e) {
          actions.replaceTerm('Shorten url ran into unknown problems', e)
          await wait(3)
          actions.hideWindow()
        }
        break
      }
  }
}

const search = async long_url => {
  const uri = 'https://api-ssl.bitly.com/v4/shorten'
  const body = JSON.stringify({ long_url })
  const fetchOptions = {
    body,
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${bitly_token}`
    },
    method: 'POST'
  }
  const result = await fetch(uri, fetchOptions).then(res => res.json())
  return result.link

}
const wait = second => {
  return new Promise(resolve => setTimeout(resolve, second * 1000))
}


export const keyword = 'short'
export const name = 'Shorten Url via Bitly'
export const icon = logo
