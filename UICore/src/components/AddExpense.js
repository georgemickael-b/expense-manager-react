import React from 'react'
import axios from 'axios'
import TextInput from 'grommet/components/TextInput';
import DateTime from 'grommet/components/DateTime';
import Select from 'grommet/components/Select';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';

class AddExpense extends React.Component{
  constructor(props){
    super(props)
    this.state={
      title : null,
      amount : null,
      notes : null,
      categories :[],
      date : new Date(),
    }
  }

  sendExpenseDetails=()=>{
    var {title,amount,notes,date} = this.state
    var categoriesID=[]
    for(let i in this.state.categories){
      let category = this.state.categories[i]
      categoriesID.push(category.value)  //category.value is the _id
     }
    console.log({title,amount,notes,date,categoriesID})
    var self=this
    axios.post("/expenses/addExpense",{title,amount,notes,date:date.toLocaleDateString(),categoriesID})
    .then(function(response){
      console.log(response)
      alert("Added");
      self.props.refreshExpensesData()
    })
    .catch(function(response){
      alert("Something went wrong")
      console.log(response)
    })
  }

  formatCategories=()=>{
    var categories=[];
    for(let i in this.props.categories){
      let category = this.props.categories[i]
      categories.push({value:category._id , label : category.name})
    }
    return categories
  }

  addCategory =(target) =>{
    console.log(target)
    this.setState({categories : target.value})
  }

  render(){
    return(
      <Box>
        <h3>Add Expense</h3>
        <table>
        <tbody>
        <tr>
          <td><label>Date</label></td>
          <td><DateTime
            value={this.state.date}
            onChange={(date) => this.setState({date: new Date(date)})}
            format ="YYYY/M/D"
          /></td>
        </tr>
        <tr>
          <td><label>Title</label></td>
          <td><TextInput
            onDOMChange = {(e)=>this.setState({title:e.target.value})}
          /></td>
        </tr>
        <tr>
          <td><label>Amount</label></td>
          <td><TextInput
            onDOMChange = {(e)=>this.setState({amount:e.target.value})}
          /></td>
        </tr>
        <tr>
          <td><label>Notes</label></td>
          <td><TextInput
            onDOMChange = {(e)=>this.setState({notes:e.target.value})}
          /></td>
        </tr>
        <tr>
          <td><label>Categories</label></td>
          <td>
          <Select inline={true} multiple={true} value={this.state.categories}
          onChange={this.addCategory} options={this.formatCategories()} />
          </td>
        </tr>
        </tbody>
        </table>

        <Button type="button" onClick={this.sendExpenseDetails} label="Add" primary={true}  />
        </Box>
    )
  }
}

export default AddExpense
