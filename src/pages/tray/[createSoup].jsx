import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout";
import * as style from "./createsoup.module.css";

const CreateSoupPage = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(props);
    }, [])

    return (
        <Layout>
            <section className={style.contentsContainer}>
                <div>
                    <div className={style.tray}>
                        <img src={"/tray.png"} width={350} />
                    </div>
                </div>

                <div className={style.sideMenuContainer}>
                    <div className={style.container}>
                        <img src={"/sideTray.png"} width={350} />
                    </div>
                    <div className={style.container}>
                        <div className={style.sideTray}>
                            <img src={"/sideTray.png"} width={350} />
                            <div className={style.sideMenu}>
                                <img src={"/meat.png"} width={60} />
                            </div>
                        </div>
                    </div>
                    <div className={style.container}>
                        <div className={style.sideTray}>
                            <img src={"/sideTray.png"} width={350} />
                            <div className={style.sideMenu}>
                                <img src={"/pepper.png"} width={100} />
                            </div>
                        </div>
                    </div>
                    <div className={style.container}>
                        <div className={style.sideTray}>
                            <img src={"/sideTray.png"} width={350} />
                            <div className={style.sideMenu}>
                                <img src={"/curry.png"} width={70} />
                            </div>
                        </div>
                    </div>
                    <div className={style.container}>
                        <img src={"/sideTray.png"} width={350} />
                    </div>
                    <div className={style.container}>
                        <img src={"/sideTray.png"} width={350} />
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default CreateSoupPage;