import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Animation from './Components/Animation/Animation';
import BasicEmbed from './Components/BasicEmbed/BasicEmbed';
import DynamicLoad from './Components/DynamicLoad/DynamicLoad';
import Events from './Components/Events/Events';
import Export from './Components/Export/Export';
import Filter from './Components/Filter/Filter';
import GetData from './Components/GetData/GetData';
import Layout from './Components/Layout/Layout';
import NotFound from './Components/NotFound/NotFound';
import Resize from './Components/Resize/Resize';
import SelectMarks from './Components/SelectMarks/SelectMarks';
import Tabs from './Components/Tabs/Tabs';

function App() {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/">
                        <BasicEmbed />
                    </Route>
                    <Route exact path="/DynamicLoad">
                        <DynamicLoad />
                    </Route>
                    <Route exact path="/Tabs">
                        <Tabs />
                    </Route>
                    <Route exact path="/Export">
                        <Export />
                    </Route>
                    <Route exact path="/Filter">
                        <Filter />
                    </Route>
                    <Route exact path="/GetData">
                        <GetData />
                    </Route>
                    <Route exact path="/Resize">
                        <Resize />
                    </Route>
                    <Route exact path="/Events">
                        <Events />
                    </Route>
                    <Route exact path="/SelectMarks">
                        <SelectMarks />
                    </Route>
                    <Route exact path="/animation">
                        <Animation />
                    </Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );
}

export default App;
