import { Component } from 'react'
import './App.css'

import AppErrorBoundary from './components/AppErrorBoundary'
import ErrorProneComponent from './components/ErrorProneComponent'

class App extends Component {
  render() {
    return (
      <AppErrorBoundary>
        <ErrorProneComponent/>
      </AppErrorBoundary>
    )
  }

}
export default App
