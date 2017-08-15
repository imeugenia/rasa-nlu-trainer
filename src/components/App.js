// @flow

import React, { Component } from 'react'
import ExampleTable from './ExampleTable'
import TopBar from './TopBar'
import AddExampleModal from './AddExampleModal'
import CompatibilityAlert from './CompatibilityAlert'
import QuantityTestBar from './QuantityTest'
import { connect } from 'react-redux'
import { Layout, Spin } from 'antd'
var _ = require('lodash')

const mapState = (state) => ({
  examples: state.examples
})

class App extends Component {
  render() {
    const { Sider, Content } = Layout;
    const { examples } = this.props
    if (!examples) {
      return (
        <Spin style={{ width: '100%', height: '100%' }}>
          <div />
        </Spin>
      )
    }

    const intents = []
    examples.forEach(({intent}) => {
      if (intent && intents.indexOf(intent) === -1) {
        intents.push(intent)
      }
    })

    const entityNames = []
    examples.forEach((example) => {
      example.entities.forEach(({entity}) => {
        if (entity && entityNames.indexOf(entity) === -1) {
          entityNames.push(entity)
        }
      })
    })

    const exampleCount =  _.countBy( examples, 'intent')
    

    return (
      <Layout>
        <Content>
          <ExampleTable
            intents={intents}
            entityNames={entityNames}
            header={() => <TopBar />}
          />
        </Content>
        <Sider
          width={300}
        >
          <QuantityTestBar exampleCount={exampleCount} />
        </Sider>
        
        <AddExampleModal
          intents={intents}
          entityNames={entityNames}
        />
        <CompatibilityAlert />
      </Layout>
    )
  }
}

export default connect(mapState)(App)
