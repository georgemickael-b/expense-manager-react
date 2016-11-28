import React from 'react'
import axios from 'axios'
import _ from 'lodash'

class View extends React.Component{
  constructor(props){
    super(props)
    this.state={
      expensesData : [],
      categories : []
    }
  }
  componentWillMount(){
    var self=this
    axios.get('/categories')
    .then(function (response) {
      self.setState({categories : response.data})
      self.loadExpenseData()
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  loadExpenseData = () =>{
    var self=this
    axios.get('/expenses')
    .then(function(response){
      console.log(response.data)
      self.setState({expensesData : response.data,})
    })
    .catch(function(err){
      console.log(err)
    })
  }

  getDataTable = ()=>{
    var expensesData=this.state.expensesData
    var categories=this.state.categories
    return(
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Notes</th>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody>
          {
            expensesData.map((d,i)=>{
              return (
                <tr key={'expense'+i}>
                  <td>{d.date.split("T")[0]}</td>
                  <td>{d.title}</td>
                  <td>{d.amount}</td>
                  <td>{d.notes}</td>
                  <td>{d.categoriesID.map((id) =>{
                      return (<span key={id}> {_.find(categories,{_id:id}).name} </span>)
                    })}</td>
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
        {this.getDataTable()}
      </div>
    )
  }
}

export default View
