import React from 'react'
import Button from 'grommet/components/Button';
import AddExpense from './AddExpense'
import DeleteExpense from './DeleteExpense'
import Box from 'grommet/components/Box';
import axios from 'axios'

class Expenses extends React.Component{
  constructor(props){
    super(props)
    var endDate = new Date()
    var startDate = new Date();
    startDate.setDate(endDate.getDate()-10);
    this.state ={
      option : "add",
      expensesData : [],
      startDate : startDate,
      endDate : endDate
    }
  }
  componentWillMount(){
    this.props.setActiveTab(0)
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

  setStartDate=(date)=>{
    this.setState({startDate:date})
  }
  setEndDate=(date)=>{
    this.setState({endDate:date})
  }

  render(){
    var option = this.state.option
    return(
      <Box direction="row" pad="medium">
        <Box pad="medium">
          <Button label="Add Expense" onClick={()=>this.setState({option:"add"})}/>
          <Button label="Delete Expense" onClick={()=>this.setState({option:"delete"})}/>
        </Box>
        <Box pad="medium">
          {option=="add" &&
          <AddExpense categories={this.props.categories}
            refreshExpensesData= {this.loadExpenseData}
          />}
          {option=="delete" &&
          <DeleteExpense expensesData={this.state.expensesData}
            categories={this.props.categories}
            refreshExpensesData= {this.loadExpenseData}
            startDate = {this.state.startDate}
            endDate = {this.state.endDate}
            setStartDate={this.setStartDate}
            setEndDate={this.setEndDate} />}
        </Box>
      </Box>
    )
  }
}

export default Expenses
