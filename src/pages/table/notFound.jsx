import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import Layout from "../../components/layout";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../auth/slice";
import * as style from "./notFound.module.css"
import { GiTable } from "react-icons/gi"

const NotFoundPage = (props) => {
    const dispatch = useDispatch();

    return (
        <>
            <div className={style.mainContainer}>
                <div className={style.textContainer}>
                    <label className={style.notFoundLabel}>"<GiTable className={style.icon} />" 비어있는 밥상입니다. ㅠㅠ</label>
                </div>
                <button className="defaultBtn">내 밥상 보러가기</button>
            </div>
        </>
    );
}

export default NotFoundPage
