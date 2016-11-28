import React from 'react'
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Button from 'grommet/components/Button'
import axios from 'axios'


class DeleteCategory extends React.Component{
  constructor(props){
    super(props)
  }

sendDeleteCategoryDetails=(categoryId)=>{
    var self=this
    axios.post("/categories/deleteCategory",{id:categoryId})
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
        <List>
          {this.props.categories.map((category,idx)=>{
            return(
              <ListItem justify="between" key={"category"+idx}>
                <span>
                  {category.name}
                </span>
                <span className="secondary" style={{paddingLeft:30}}>
                  <Button type="button" secondary={true} onClick={this.sendDeleteCategoryDetails.bind(this,category._id)} label="Delete"  />
                </span>
              </ListItem>
          )
          })}
        </List>
      </div>
    )
  }

}

export default DeleteCategory
