import Sidebar from "./Sidebar";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        friendsItems: state.sidebar.friendsItems
    }
}
export type SidebarMapStatePropsType = ReturnType<typeof mapStateToProps>

let SidebarContainer = connect(mapStateToProps, {})(Sidebar)

export default SidebarContainer