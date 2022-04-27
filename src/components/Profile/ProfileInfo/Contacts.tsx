import React, {Props} from "react";

type PropsType = {
    contactType: string
    contactValue: string
}

const Contacts: React.FC<PropsType> = ({contactType, contactValue}) => {
    return <div>
        <b>{contactType}</b>: {contactValue}
    </div>
}

export default Contacts