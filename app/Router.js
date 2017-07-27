import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import App from './App';
import './index.css';
import './style/lib/animate.css';
import Page from './components/Page';
import BasicForm from './components/forms/BasicForm';
import BasicTable from './components/tables/BasicTables';
import AdvancedTable from './components/tables/AdvancedTables';
import AsynchronousTable from './components/tables/AsynchronousTable';
import Login from './components/pages/Login';
import Echarts from './components/charts/Echarts';
import Recharts from './components/charts/Recharts';
import Configs from './components/ui/Configs';
import Buttons from './components/ui/Buttons';
import Spins from './components/ui/Spins';
import Modals from './components/ui/Modals';
import Notifications from './components/ui/Notifications';
import Tabs from './components/ui/Tabs';
import Banners from './components/ui/banners';
import Drags from './components/ui/Draggable';
import Gallery from './components/ui/Gallery';
import NotFound from './components/pages/NotFound';
import BasicAnimations from './components/animation/BasicAnimations';
import ExampleAnimations from './components/animation/ExampleAnimations';

const Wysiwyg = (location, cb) => {     // 按需加载富文本配置
    require.ensure([], require => {
        cb(null, require('./components/ui/Wysiwyg').default);
    }, 'Wysiwyg');
};

const Dashboard = (location, cb) => {     // 按需加载富文本配置
    require.ensure([], require => {
        cb(null, require('./components/dashboard/Dashboard').default);
    }, 'Dashboard');
};

const Root =
    <Route path={'/'} components={Page}>
        <IndexRedirect to="/app/dashboard/index" />
        <Route path={'app'} component={App}>
            <Route path={'form'}>
                <Route path={'basicForm'} component={BasicForm} />
            </Route>
            <Route path={'table'}>
                <Route path={'basicTable'} component={BasicTable} />
                <Route path={'advancedTable'} components={AdvancedTable} />
                <Route path={'asynchronousTable'} components={AsynchronousTable} />
            </Route>
            <Route path={'chart'}>
                <Route path={'echarts'} component={Echarts} />
                <Route path={'recharts'} component={Recharts} />
            </Route>
            <Route path={'ui'}>
                <Route path={'configs'} component={Configs} />
                <Route path={'buttons'} component={Buttons} />
                <Route path={'spins'} component={Spins} />
                <Route path={'modals'} component={Modals} />
                <Route path={'notifications'} component={Notifications} />
                <Route path={'tabs'} component={Tabs} />
                <Route path={'banners'} component={Banners} />
                <Route path={'wysiwyg'} getComponent={Wysiwyg} />
                <Route path={'drags'} component={Drags} />
                <Route path={'gallery'} component={Gallery} />
            </Route>
            <Route path={'animation'}>
                <Route path={'basicAnimations'} component={BasicAnimations} />
                <Route path={'exampleAnimations'} component={ExampleAnimations} />
            </Route>
            <Route path={'dashboard/index'} getComponent={Dashboard} />
        </Route>
        <Route path={'login'} components={Login} />
        <Route path={'404'} component={NotFound} />
    </Route>;


ReactDOM.render(
    <Router history={hashHistory}>
        {Root}
    </Router>,
    document.getElementById('root')
);