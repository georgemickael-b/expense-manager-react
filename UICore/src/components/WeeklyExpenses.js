import React from 'react'
import Button from 'grommet/components/Button';
import DateTime from 'grommet/components/DateTime';
import axios from 'axios'
import TextInput from 'grommet/components/TextInput';
import Select from 'grommet/components/Select';

const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
class WeeklyExpenses  extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      expensesData:[],
      year : new Date().getFullYear(),
      month : new Date().getMonth()
    }
  }
  componentWillMount(){
    this.loadExpenseData()
  }
  loadExpenseData = () =>{
    var {year,month} = this.state
    var self=this
    console.log(year,month)
    axios.post('/expenses/weekly',{year,month:month+1})
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
            <th>Week</th>
            <th>Category</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {
            expensesData.map((d,i)=>{
              return (
                <tr key={'expense'+i}>
                  <td>{d._id.week}</td>
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
      <h3>Weekly Expense </h3><br/>
      <label>Year</label>
      <TextInput
        defaultValue = {""+this.state.year}
        onDOMChange = {(e)=>this.setState({year:e.target.value})}
      /><br/>
      <label>Month</label>
      <span><Select defaultValue={months[this.state.month]}
        value={months[this.state.month]}
        onChange={(target)=>this.setState({month:months.indexOf(target.value)})}
        options={months} /></span>
      <Button label="Refresh" accent={true}
      onClick = {this.loadExpenseData} />
        {this.getDataTable()}
      </div>
    )
  }
}
export default WeeklyExpenses
