import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from "./Fish";
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };
    componentDidMount() {
        const { params } = this.props.match;
        // first reinstate our localStorage
        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    addFish = (fish) => {
        // 1. take a copy of the existing state
        const fishes = {...this.state.fishes};
        // 2. add our new fish to that fishes variable
        fishes[`fish${Date.now()}`] = fish;
        // 3. set the new fishes object to state
        this.setState({fishes});
    };

    updateFish = (key, updatedFish) => {
        // 1. take a copy of the current state
        const fishes = { ...this.state.fishes };
        // 2. update that state
        fishes[key] = updatedFish;
        // 3. set that to state
        this.setState({fishes} );
    };

    deleteFish = (key) => {
        // 1. take a copy of state
        const fishes = {...this.state.fishes};
        // 2. update the state
        fishes[key] = null;
        // 3. update state
        this.setState({ fishes });
    };

    loadSampleFishes = () => {
        this.setState({fishes: sampleFishes})
    };
    addToOrder = (key) => {
        // 1. take a copy of state
        const order = {...this.state.order};
        // 2. either add to the order or update the number in our order
        order[key] = order[key] + 1 || 1;
        // 3. call setState to update our state object
        this.setState({order});
    };
    removeFromOrder = (key) => {
        // 1. take a copy of state
        const order = {...this.state.order};
        // 2. remove item from order
        delete order[key];
        // 3. call setState to update our state object
        this.setState({order});
    };

    render() {
        return (
            <div className={'catch-of-the-day'}>
                <div className={'menu'}>
                    <Header tagline={'Fresh Seafood Market'}/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                            <Fish key={key}
                                  index={key}
                                  addToOrder={this.addToOrder}
                                  details={this.state.fishes[key]} />
                        ))}
                    </ul>
                </div>
                <Order fishes={this.state.fishes}
                       removeFromOrder={this.removeFromOrder}
                       order={this.state.order}/>
                <Inventory addFish={this.addFish}
                           updateFish={this.updateFish}
                           deleteFish={this.deleteFish}
                           fishes={this.state.fishes}
                           loadSampleFishes={this.loadSampleFishes}/>
            </div>
        )
    }
}

export default App;
