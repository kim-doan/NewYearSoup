import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout";
import { userAction, userSelector } from "../auth/slice";
import NotFoundPage from "./notFound";

const SoupTablePage = (props) => {
    const dispatch = useDispatch();
    const isSearchUser = useSelector(userSelector.isSearchUser);
    const isLoading = useSelector(userSelector.isLoading);

    useEffect(() => {
        dispatch(userAction.getUserLoad({ uid: props.params.soupTable }));
    }, [props])

    useEffect(() => {
        console.log(isSearchUser);
    }, [isSearchUser])
    // useEffect(() => {
    //     if (isSignUp) {

    //     } else {
    //         navigate("404.js")
    //     }
    // }, [isSignUp])

    return (
        <Layout>
            <section className="defaultPanel">
            <div className="defaultContainer">
            {isLoading ? <div class="loader"></div> :
                isSearchUser ?
                    <>{props.params.soupTable}</>
                : <NotFoundPage></NotFoundPage>
                
                }
                </div>
            </section>
            {/* {!isLoading ? <>
                { isSearchUser ? props.params.soupTable : "못찾음"}
            </> : <></> } */}
            
        </Layout>
    );
}

export default SoupTablePage