import React, { Component } from 'react';

const AppContext = React.createContext()
class AppProvider extends Component{
    state={
        timers:[]
    }
    render(){

        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }   
}