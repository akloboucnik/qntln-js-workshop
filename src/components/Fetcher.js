import React, { Component } from 'react'


export class Fetcher extends Component {
    render () {
        return (
            <div className='fetcher container'>
                <div className='field'>
                    <label className='label' for='uri'>URI</label>
                    <div className='control'>
                        <input className='input' type='text' id='uri'/>
                    </div>
                </div>
                <div className='field'>
                    <div className='control'>
                        <input className='button' type='submit' value='Fetch!' />
                    </div>
                </div>
            </div>
        )
    }
}
