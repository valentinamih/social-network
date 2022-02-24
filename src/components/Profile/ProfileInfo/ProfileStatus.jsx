import React from "react";
import {createField} from "../../common/FormControls/FormControls";

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState( {
            editMode: true
        })

    }
    deactivateEditMode = () => {
        this.setState( {
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    render() {
        return <div>
            {!this.state.editMode ? <span onDoubleClick={this.activateEditMode}>{this.props.status || '---'} </span>
            :<input onChange={this.onStatusChange}  autoFocus={true} onBlur={this.deactivateEditMode} type='text' value={this.state.status}/>}
        </div>
    }
}

export default ProfileStatus