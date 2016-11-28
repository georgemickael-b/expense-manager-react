import React from 'react'
import axios from 'axios'
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';

class AddCategory extends React.Component{
  constructor(props){
    super(props)
    this.state={
      name : null
    }
  }
  sendCategoryDetails=()=>{
    var self=this
    axios.post("/categories/addCategory",{name:this.state.name})
    .then(function(response){
      console.log(response)
      self.props.refreshCategories()
    })
    .catch(function(response){
      console.log(response)
    })
  }
  render(){
    return(
      <div>
        <label>Name</label>
        <TextInput
          onDOMChange = {(e)=>this.setState({name:e.target.value})}
        /><br /> <br/>
        <Button type="button" onClick={this.sendCategoryDetails} label="Add" primary={true}  />
      </div>
    )
  }
}
export default AddCategory
