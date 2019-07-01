import React from 'react'
import './Result.css'


export default class Result extends React.Component {
    taxBrackets = [
        {
            min: 0, max: 47630, rate: 0.15
        },
        {
            min: 47630, max: 95259, rate: 0.205
        },
        {
            min: 95259, max: 147667, rate: 0.26
        },
        {
            min: 147667, max: 210371, rate: 0.29
        },
        {
            min: 210371, max: Math.min(), rate: 0.33
        }]

    /**
     * Returns given amount in USD
     * @param {*} amount : number 
     */
    currencyFormatter(amount) {
        return amount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        })
    }
    /**
     * Returns given amount in percent
     * @param {*} amount : number 
     */
    percentFormatter(amount) {
        return amount.toLocaleString(undefined, {
            style: 'percent',
            minimumFractionDigits: 1
        })
    }
    /**
     * Returns a breakdown of tax rates and amounts for each applicable tax bracket (e.g. [{rate: rate, amount: amount}])
     * @param {*} income :number
     */
    inRange(income) {
        if (income === 0) {
            return [{ rate: this.taxBrackets[0].rate, amount: this.taxBrackets[0].min }]
        } else {
            let tax = []
            this.taxBrackets.forEach((elem) => {
                if (elem.min < income) {
                    if (elem.max < income) {
                        tax.push({ rate: parseFloat(elem.rate), amount: parseFloat(((elem.max - elem.min) * elem.rate).toFixed(2)) })
                    } else {
                        tax.push({ rate: parseFloat(elem.rate), amount: parseFloat(((income - elem.min) * elem.rate).toFixed(2)) })
                    }
                }
            })
            return tax
        }
    }
    /**
     * Returns total tax amount and effective tax rate (e.g. {sum: totalTaxAmount, finalRate: finalTaxRate})
     * @param {*} taxBreakdown : array
     */
    summary(taxBreakdown) {
        let sum = 0
        let finalRate = taxBreakdown[taxBreakdown.length - 1]["rate"]
        taxBreakdown.forEach(elem => {
            sum += elem.amount
        })
        return { sum: parseFloat((sum).toFixed(2)), finalRate: finalRate }
    }
    /**
     * Renders a table and displays the breakdown of tax amount
     */
    render() {
        const items = this.inRange(parseFloat(this.props.match.params.value))
        const taxList = items.map((elem, index) => {
            return <tr key={++index}>
                <td data-label="Tax Bracket Id">{index}</td>
                <td data-label="Tax Amount">{this.currencyFormatter(elem.amount)}</td>
                <td data-label="Tax Rate">{this.percentFormatter(elem.rate)}</td>
            </tr>
        })
        const summary = this.summary(items)
        return <table>
            <caption>Income Tax Summary</caption>
            <thead>
                <tr>
                    <th>Tax Bracket Id</th>
                    <th>Tax Amount</th>
                    <th>Tax Rate</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <td data-label="Tax Bracket Id">Total</td>
                    <td data-label="Tax Amount">{this.currencyFormatter(summary.sum)}</td>
                    <td data-label="Tax Rate">{this.percentFormatter(summary.finalRate)}</td>
                </tr>
            </tfoot>
            <tbody>
                {taxList}
            </tbody>
        </table>
    }
}


