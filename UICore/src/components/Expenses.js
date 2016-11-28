import React from 'react'
import Button from 'grommet/components/Button';
import AddExpense from './AddExpense'
import Box from 'grommet/components/Box';
import axios from 'axios'

class Expenses extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      option : "add"
    }
  }
  componentWillMount(){
    this.props.setActiveTab(0)
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
          <AddExpense categories={this.props.categories} />}
        </Box>
      </Box>
    )
  }
}

export default Expenses
