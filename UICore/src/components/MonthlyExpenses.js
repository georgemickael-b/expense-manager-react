import React from 'react'
import Button from 'grommet/components/Button';
import DateTime from 'grommet/components/DateTime';
import axios from 'axios'
import TextInput from 'grommet/components/TextInput';


const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
class MonthlyExpenses  extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      expensesData:[],
      year : new Date().getFullYear()
    }
  }
  componentWillMount(){
    this.loadExpenseData()
  }
  loadExpenseData = () =>{
    var {year} = this.state
    var self=this
    axios.post('/expenses/monthly',{year})
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
            <th>Month</th>
            <th>Category</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {
            expensesData.map((d,i)=>{
              return (
                <tr key={'expense'+i}>
                  <td>{months[d._id.month-1]}</td>
                  <td><span> {_.find(categories,{_id:d._id.categoryID}).name} </span></td>
                  <td>{d.total}</td>
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
      <h3>Monthly Expense </h3><br/>
      <label>Year</label>
      <TextInput
        defaultValue = {""+this.state.year}
        onDOMChange = {(e)=>this.setState({year:Number(e.target.value)})}
      />
      <Button label="Refresh" accent={true}
      onClick = {this.loadExpenseData} />
        {this.getDataTable()}
      </div>
    )
  }
}
export default MonthlyExpenses
