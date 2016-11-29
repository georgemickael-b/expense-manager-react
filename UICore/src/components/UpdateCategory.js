import React from 'react'
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Button from 'grommet/components/Button'
import axios from 'axios'
import TextInput from 'grommet/components/TextInput';


class UpdateCategory extends React.Component{
  constructor(props){
    super(props)
  }

sendUpdateCategoryDetails=(categoryId)=>{
  var name = document.getElementById("updateCategory"+categoryId).value
  var self=this
    axios.post("/categories/updateCategory",{id:categoryId,name:name})
    .then(function(response){
      console.log(response)
      alert("Updated")
      self.props.refreshCategories()
    })
    .catch(function(response){
      alert("Something went wrong")
      console.log(response)
    })
  }

  render(){
    return(
      <div>
        <h3>Update Category</h3><br/>
        <List>

          {this.props.categories.map((category,idx)=>{
            return(
              <ListItem justify="between" key={"category"+idx}>
                <span>
                  {category.name}
                  <br/>
                  <TextInput onDOMChange={()=>{}}
                   defaultValue={category.name}
                   name={category.name}
                   id={"updateCategory"+category._id}/>
                </span>
                <span className="secondary" style={{paddingLeft:30}}>
                  <Button type="button" accent={true}
                  onClick={this.sendUpdateCategoryDetails.bind(this,category._id)}
                  label="Update"  />
                </span>
              </ListItem>
          )
          })}
        </List>
      </div>
    )
  }

}

export default UpdateCategory
