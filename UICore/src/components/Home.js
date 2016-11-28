import React from 'react'
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Expenses from './Expenses'
import Categories from './Categories'
import View from './View'
import axios from 'axios'

class Home extends React.Component{
  constructor(props){
    super(props)
    this.state={
      categories:[],
      activeTab : 0,
    }
  }
  componentWillMount=()=>{
    this.loadCategoriesData()
  }
  loadCategoriesData = () =>{
    var self=this
    axios.get('/categories')
    .then(function (response) {
      self.setState({categories : response.data})
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  setActiveTab=(idx)=>{
    this.setState({activeTab:idx})
  }
  render(){
    return(
      <div>
        <h1>Expense Manager</h1>

        <Tabs activeIndex={this.state.activeTab}>
          <Tab title="Expenses"  >
           <Expenses categories={this.state.categories} setActiveTab={this.setActiveTab}/>
          </Tab>
          <Tab title="Category" >
            <Categories categories={this.state.categories}
               refreshCategories={this.loadCategoriesData}
               setActiveTab={this.setActiveTab}/>
          </Tab>
          <Tab title="View">
              <View setActiveTab={this.setActiveTab} />
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default Home
