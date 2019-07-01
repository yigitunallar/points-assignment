import React from 'react';
import { withRouter } from 'react-router-dom'

class Form extends React.Component {

    state = { value: '' }

    /**
     * Dynamically sets state.value once a user inputs an income amount
     * @param {*} event 
     */
    handleChange = event => {
        this.setState({ value: event.target.value });
    }

    /**
     * Redirects to '/result/:value' once a user clicks the Submit button
     * @param {*} event 
     */
    handleSubmit = event => {
        event.preventDefault()
        this.props.history.push(`result/${this.state.value}`)
    }

    /**
     * Renders a form and handles user interaction
     */
    render() {
        return (
            <div className="feedback-card">
                <div className="feedback-header">
                    Please enter your income
                </div>
                <form className="feedback-body" onSubmit={this.handleSubmit}>
                    <input type="text" className="feedback-body__email" placeholder="Income amount" value={this.state.value} onChange={this.handleChange} />
                    <button className="feedback-body__submit" onClick={this.handleSubmit}>Send</button>
                </form>
            </div >

        );
    }
}
export default withRouter(Form)