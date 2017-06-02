
var React = require('react');
import App from './components/app';
var ReactDOM = require('react-dom')

console.log()
function render() {
  return (
    ReactDOM.render(
        <App/>,
      document.getElementById('root')
    )
  )
}
 render()
