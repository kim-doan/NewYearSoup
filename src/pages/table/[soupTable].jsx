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
import { soupAction, soupSelector } from "./slice";

const SoupTablePage = (props) => {
    const dispatch = useDispatch();
    const isSearchUser = useSelector(userSelector.isSearchUser);
    const isLoading = useSelector(userSelector.isLoading);
    const searchUserInfo = useSelector(userSelector.searchUserInfo);
    const soupList = useSelector(soupSelector.soupList);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    useEffect(() => {
        console.log(soupList)
    }, [soupList])

    const slickNext = (test) => {
        console.log(test)
        dispatch(soupAction.getSoupLoad({ userId: props.params.soupTable, page: test }))
    }
    const test = () => {
        console.log("test")
    }

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
                                <div className={style.soupTableContainer}>
                                    <div className={style.titleContainer}>
                                        <label>{searchUserInfo.USER_NAME}님에게</label>
                                        <label>떡국 1그릇이 배달됐어요!!</label>
                                    </div>
                                    <div className={style.soupTableBox}>
                                        <Slider {...settings} afterChange={slickNext}>
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
                                </div>
                            </div>
                        </>
                        : <NotFoundPage></NotFoundPage>
                }
            </section>
        </Layout>
    );
}

const NextArrow = (props) => {
    const { className, style, onClick } = props;

    return (
        <div
            className={className}
            style={{ ...style, right: "50px", top: "130px" }}
            onClick={onClick}
        />
    );
}

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, left: "10px", zIndex: 1 }}
            onClick={onClick}
        />
    );
}


export default SoupTablePage