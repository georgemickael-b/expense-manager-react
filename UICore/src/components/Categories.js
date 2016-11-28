import React from 'react'
import Button from 'grommet/components/Button'
import AddCategory from './AddCategory'
import DeleteCategory from './DeleteCategory'
import UpdateCategory from './UpdateCategory'
import Box from 'grommet/components/Box'

class Categories extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      option : "add"
    }
  }
  componentWillMount(){
    this.props.setActiveTab(1)
  }
  render(){
    var option = this.state.option
    return(
      <Box direction="row" pad="medium">
        <Box pad="medium">
          <Button label="Add Category" onClick={()=>this.setState({option:"add"})}/>
          <Button label="Delete Category" onClick={()=>this.setState({option:"delete"})}/>
          <Button label="Update Category" onClick={()=>this.setState({option:"update"})}/>
        </Box>
        <Box pad="medium">
          {option=="add" && <AddCategory refreshCategories={this.props.refreshCategories}/>}
          {option=="delete" && <DeleteCategory categories={this.props.categories}
            refreshCategories={this.props.refreshCategories}/>}
          {option=="update" && <UpdateCategory categories={this.props.categories}
            refreshCategories={this.props.refreshCategories}/>}
        </Box>
      </Box>
    )
  }
}
export default Categories
