import React from 'react'
import Button from 'grommet/components/Button';
import DateTime from 'grommet/components/DateTime';
import axios from 'axios'

class RawView  extends React.Component{
  constructor(props){
    super(props)
    var endDate = new Date()
    var startDate = new Date();
    startDate.setDate(endDate.getDate()-10);
    this.state = {
      expensesData:[],
      endDate : endDate,
      startDate : startDate
    }
  }
  componentWillMount(){
    this.loadExpenseData()
  }
  loadExpenseData = () =>{
    var {startDate,endDate} = this.state
    var self=this
    axios.post('/expenses',{startDate:startDate.toLocaleDateString(),
                            endDate :endDate.toLocaleDateString()})
    .then(function(response){
      console.log(response.data)
      self.setState({expensesData : response.data})
    })
    .catch(function(err){
      console.log(err)
    })
  }

  getDataTable = ()=>{
    if(!this.state.expensesData)
        return <div>Loading...</div>
    var expensesData=this.state.expensesData
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
      <h3> Raw Expense Data</h3>
      From : <DateTime
        value={this.state.startDate}
        onChange={(date) => {
                    this.setState({startDate : new Date(date)})
                    this.loadExpenseData()
                    }
                  }
        format ="M/D/YYYY"
      />
      To : <DateTime
        value={this.state.endDate}
        onChange={(date) => {
                    this.setState({endDate : new Date(date)})
                    this.loadExpenseData()
                  }
                }
        format ="M/D/YYYY"
      />
      <Button label="Refresh" accent={true}
      onClick = {this.loadExpenseData} />

        {this.getDataTable()}
      </div>
    )
  }
}

export default RawView
