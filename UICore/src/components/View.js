import React from 'react'
import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import axios from 'axios'
import _ from 'lodash'
import DailyExpenses from './DailyExpenses'
import MonthlyExpenses from './MonthlyExpenses'
import WeeklyExpenses from './WeeklyExpenses'
import RawView from './RawView'

class View extends React.Component{
  constructor(props){
    super(props)
    this.state={
      option :'daily'
    }
  }
  componentWillMount(){
    this.props.setActiveTab(2)
  }

  render(){
    return(
      <Box direction="row" pad="medium">
        <Box pad="medium">
          <Button label="Daily" onClick={()=>this.setState({option:"daily"})}/>
          <Button label="Weekly" onClick={()=>this.setState({option:"weekly"})}/>
          <Button label="Monthly" onClick={()=>this.setState({option:"monthly"})}/>
          <Button label="Raw" onClick={()=>this.setState({option:"raw"})}/>
        </Box>
        <Box pad="medium">
          {this.state.option=="daily" && <DailyExpenses
          categories={this.props.categories}/>}
          {this.state.option=="monthly" && <MonthlyExpenses
          categories={this.props.categories}/>}
          {this.state.option=="weekly" && <WeeklyExpenses
          categories={this.props.categories}/>}
          {this.state.option=="raw" && <RawView
          categories={this.props.categories}/>}
        </Box>
      </Box>
    )
  }
}

export default View
