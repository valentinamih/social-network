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
import store, {AppStateType} from "./redux/redux-store";
import Error from "./components/common/Errors/Error";
import {withSuspense} from "./hoc/whithSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    initializeApp: () => void,
    catchGlobalError: (reason: string) => void
}

const SuspendedDialogs = withSuspense(DialogsContainer)

class App extends Component<MapStatePropsType & MapDispatchPropsType> {
    catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
        this.props.catchGlobalError(promiseRejectionEvent.reason.message)
    }
    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }
    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }
    addErrorMessage (message: string) {
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
                    <Route path='/dialogs' render={() => <SuspendedDialogs />}/>
                    <Route path='/users' render={() => <UsersContainer title={'Users'}/>}/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>
                    <Route path='/login' component={Login}/>
                </div>
            </div>
        );
    }
}
let mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
    globalError: state.app.globalError
})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp, catchGlobalError}))(App)

let MainApp: React.FC = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainApp
