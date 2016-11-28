import React from 'react'
import Button from 'grommet/components/Button';
import DateTime from 'grommet/components/DateTime';
import axios from 'axios'

class DeleteExpense  extends React.Component{
  constructor(props){
    super(props)
  }

  sendDeleteExpenseDetails(expenseId){
    var self=this
    axios.post("/expenses/deleteExpense",{id:expenseId})
    .then(function(response){
      console.log(response)
      self.props.refreshExpensesData()
    })
    .catch(function(response){
      console.log(response)
    })
  }

  getDataTableForDelete = ()=>{
    if(!this.props.expensesData)
        return <div>Loading...</div>
    var expensesData=this.props.expensesData
    var categories=this.props.categories
    return(
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Notes</th>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody>
          {
            expensesData.map((d,i)=>{
              return (
                <tr key={'expense'+i}>
                  <td>{new Date(d.date).toLocaleDateString()}</td>
                  <td>{d.title}</td>
                  <td>{d.amount}</td>
                  <td>{d.notes}</td>
                  <td>{d.categoriesID.map((id) =>{
                      return (<span key={id}> {_.find(categories,{_id:id}).name} </span>)
                    })}</td>
                  <td>
                    <Button label="Delete" secondary={true}
                    onClick = {this.sendDeleteExpenseDetails.bind(this,d._id)} />
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
    )
  }

  render(){
    return(
      <div>
      From : <DateTime
        value={this.props.startDate}
        onChange={(date) => {
                    this.props.setStartDate(new Date(date))
                    }
                  }
        format ="M/D/YYYY"
      />

      To : <DateTime
        value={this.props.endDate}
        onChange={(date) => {
                    this.props.setEndDate(new Date(date))
                  }
                }
        format ="M/D/YYYY"
      />
      <Button label="Refresh" accent={true}
      onClick = {this.props.refreshExpensesData} />

        {this.getDataTableForDelete()}
      </div>
    )
  }
}

export default DeleteExpense
