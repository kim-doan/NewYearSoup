import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout";
import { userAction, userSelector } from "../auth/slice";
import NotFoundPage from "./notFound";
import * as style from "./soupTable.module.css";

const SoupTablePage = (props) => {
    const dispatch = useDispatch();
    const isSearchUser = useSelector(userSelector.isSearchUser);
    const isLoading = useSelector(userSelector.isLoading);
    const searchUserInfo = useSelector(userSelector.searchUserInfo);

    useEffect(() => {
        console.log(props.params.soupTable)
        dispatch(userAction.getUserLoad({ uid: props.params.soupTable }));
    }, [])

    useEffect(() => {
        console.log(searchUserInfo);
    }, [searchUserInfo])
    // useEffect(() => {
    //     if (isSignUp) {

    //     } else {
    //         navigate("404.js")
    //     }
    // }, [isSignUp])

    return (
        <Layout>
            <section className="defaultPanel">
                    {isLoading ? <div className="loader"></div> :
                        isSearchUser ?
                        <>
                            <div className={style.contentsContainer}>
                                <div className={style.titleContainer}>
                                    <label>{searchUserInfo.USER_NAME}님에게</label>
                                    <label>떡국 1그릇이 배달됐어요!</label>
                                </div>
                            {props.params.soupTable}
                            </div>
                            </>
                            : <NotFoundPage></NotFoundPage>
                    }
            </section>
        </Layout>
    );
}

export default SoupTablePage