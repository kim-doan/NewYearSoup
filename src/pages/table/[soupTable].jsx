import { StaticImage } from "gatsby-plugin-image";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout";
import { userAction, userSelector } from "../auth/slice";
import NotFoundPage from "./notFound";
import * as style from "./soupTable.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SoupTablePage = (props) => {
    const dispatch = useDispatch();
    const isSearchUser = useSelector(userSelector.isSearchUser);
    const isLoading = useSelector(userSelector.isLoading);
    const searchUserInfo = useSelector(userSelector.searchUserInfo);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

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
                    !isSearchUser ?
                        <>
                            <div className={style.contentsContainer}>
                                <div className={style.soupTableContainer}>
                                    <div className={style.titleContainer}>
                                        <label>{searchUserInfo.USER_NAME}님에게</label>
                                        <label>떡국 1그릇이 배달됐어요!!</label>
                                    </div>
                                    <div className={style.soupTableBox}>
                                        <Slider {...settings}>
                                            <div className={style.soupTable}>
                                                <StaticImage
                                                    src="../../../assets/img/table.png"
                                                    alt="table"
                                                    layout="fixed"
                                                    width={350}
                                                />
                                                <div className={style.soupPostion01}>
                                                    <StaticImage
                                                        src="../../../assets/icon/soup01.png"
                                                        alt="soup01"
                                                        layout="constrained"
                                                        width={100}
                                                    />
                                                </div>
                                                <div className={style.soupPostion02}>
                                                    <StaticImage
                                                        src="../../../assets/icon/soup02.png"
                                                        alt="soup02"
                                                        layout="constrained"
                                                        width={100}
                                                    />
                                                </div>
                                                <div className={style.soupPostion03}>
                                                    <StaticImage
                                                        src="../../../assets/icon/soup01.png"
                                                        alt="soup03"
                                                        layout="constrained"
                                                        width={100}
                                                    />
                                                </div>
                                                <div className={style.soupPostion04}>
                                                    <StaticImage
                                                        src="../../../assets/icon/soup02.png"
                                                        alt="soup04"
                                                        layout="constrained"
                                                        width={100}
                                                    />
                                                </div>
                                            </div>
                                            <div className={style.soupTable}>
                                                <StaticImage
                                                    src="../../../assets/img/table.png"
                                                    alt="table"
                                                    layout="fixed"
                                                    width={350}
                                                />
                                                <div className={style.soupPostion01}>
                                                    <StaticImage
                                                        src="../../../assets/icon/soup01.png"
                                                        alt="soup01"
                                                        layout="constrained"
                                                        width={100}
                                                    />
                                                </div>
                                                <div className={style.soupPostion02}>
                                                    <StaticImage
                                                        src="../../../assets/icon/soup02.png"
                                                        alt="soup02"
                                                        layout="constrained"
                                                        width={100}
                                                    />
                                                </div>
                                                <div className={style.soupPostion03}>
                                                    <StaticImage
                                                        src="../../../assets/icon/soup01.png"
                                                        alt="soup03"
                                                        layout="constrained"
                                                        width={100}
                                                    />
                                                </div>
                                                <div className={style.soupPostion04}>
                                                    <StaticImage
                                                        src="../../../assets/icon/soup02.png"
                                                        alt="soup04"
                                                        layout="constrained"
                                                        width={100}
                                                    />
                                                </div>
                                            </div>
                                        </Slider>
                                    </div>
                                    {/* <div className={style.soupTableBox}>
                                            <StaticImage
                                                src="../../../assets/icon/soup01.png"
                                                alt="soup01"
                                                layout="constrained"
                                                width={150}
                                            />
                                    </div> */}
                                </div>
                            </div>
                        </>
                        : <NotFoundPage></NotFoundPage>
                }
            </section>
        </Layout>
    );
}

export default SoupTablePage