import './style.css'
import { getRepos } from './app.js'

document.querySelector('#app').innerHTML = `
  <div>
  <h3>webscraping a githubs users repos</h3>
  <p>enter a github username</p>
  <input type="text" id="username" placeholder="username" />
  <button id="button">submit</button>
  <p id="repos"></p>
  </div>
`
getRepos(document.querySelector('#button'), document.querySelector('#username'))
/* setupCounter(document.querySelector('#counter')) */
