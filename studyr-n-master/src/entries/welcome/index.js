import { connect } from "react-redux";
import Welcome from "./container/index";
import actions from "../../models/actions";

export default connect(
    ({ userInfo }) => ({
        userInfo
    }),
    {
        userLogin: actions.userLogin
    }
)(Welcome);

