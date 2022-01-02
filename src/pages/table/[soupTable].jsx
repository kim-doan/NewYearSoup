import { navigate } from "gatsby";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout";
import { userAction, userSelector } from "../auth/slice";

const SoupTablePage = (props) => {
    const dispatch = useDispatch();
    const isSignUp = useSelector(userSelector.isSignUp);

    useEffect(() => {
        // dispatch(userAction.isSignUpLoad({ uid: props.params.soupTable }));
    }, [props])

    useEffect(() => {
        if (isSignUp) {

        } else {
            navigate("404.js")
        }
    }, [isSignUp])

    return (
        <Layout>
            {props.params.soupTable}
        </Layout>
    );
}

export default SoupTablePage