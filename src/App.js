import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter,Redirect, Route, withRouter} from 'react-router-dom'
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/common/Login";
import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {catchGlobalError, initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader";
import store from "./redux/redux-store";
import Error from "./components/common/Errors/Error";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));


class App extends Component {
    catchAllUnhandledErrors = (promiseRejectionEvent) => {
        this.props.catchGlobalError(promiseRejectionEvent.reason.message)
    }
    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }
    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }
    addErrorMessage (message) {
        return <Error message={message} />
    }
    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    {this.props.globalError ? this.addErrorMessage(this.props.globalError) : null}
                    <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/dialogs' render={() => <React.Suspense fallback={<Preloader />}>
                        <DialogsContainer />
                    </React.Suspense>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>
                    <Route path='/login' component={Login}/>
                </div>
            </div>
        );
    }
}
let mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    globalError: state.app.globalError
})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp, catchGlobalError}))(App)

let MainApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainApp
