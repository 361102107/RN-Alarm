import { connect } from "react-redux";
import About from "./container/index";
import actions from "../../../../models/actions";

export default connect(
    ({ userInfo }) => ({
        userInfo
    }),
    {
        userLogin: actions.userLogin
    }
)(About);