import React, { Component } from 'react'
import { Progress, Alert } from 'antd'
var _ = require('lodash')


class QuantityTestBar extends Component {

    getPercent = (exampleMinPerIntent, exampleMinTotal) => {
        let realExampleNum = 0
        const exampleCount = this.props.exampleCount

        _.map( exampleCount, (value) => {
            if ( value > exampleMinPerIntent ) return realExampleNum += exampleMinPerIntent     
            return realExampleNum += value
        })
        const percent = Math.round( realExampleNum / exampleMinTotal * 100 )
        if (percent) return percent
        return 0
    }
    render() {
        const exampleCount = this.props.exampleCount
        const intentNum = Object.keys(exampleCount).length
        // let accept that there is a ratio for calculating example Minimum Per Intent and this ratio is 0.6 
        // it come from: ( for 5 intents we need at least 3 examples => 3 / 5 = 0.6 )
        // but the very minimum of examples is 3
        const ratio = 0.6
        const exampleMinPerIntent = ( intentNum > 5 ) ? Math.round( intentNum * ratio ) : 3
        const exampleMinTotal = exampleMinPerIntent * intentNum
        const percent = this.getPercent(exampleMinPerIntent, exampleMinTotal)
        const shouldBeFixed = _.mapValues( this.props.exampleCount, (value) => {
            return exampleMinPerIntent - value
        })
        
        let body = null;
        if ( percent === 0 ) {
            body = <Alert className="test-alert" message={`Please, start adding examples or upload a file.`} type="warning" showIcon />
        } else if ( percent === 100 ) {
            body = <Alert className="test-alert-success" message={<span>Great!<br/> You have enought training data for Rasa NLU!</span>} type="success" />
        } else {
            body = _.map( shouldBeFixed, ( value, key ) => {
                if ( value > 0 ) return <Alert key={key} className="test-alert" message={
                    <span>Add at least <b>{value}</b> more example(s) to <b>{key}</b> intent.</span>
                    } type="warning" showIcon />
            })
        }

        return (
            <div className="test-bar-wrapper">
                <div className="test-bar-header">
                    <h2 style={{marginBottom: "40px"}}>
                        Training data quantity test
                    </h2>
                    <p>
                        
                    </p>
                    <Progress className="test-progress" type="circle" percent={ percent } />
                </div>
                <div className="test-bar-body">
                    { body } 
                </div>
            </div>
            
        )
    }
}

export default QuantityTestBar