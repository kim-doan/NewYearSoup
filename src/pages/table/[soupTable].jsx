import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";
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
import { graphql, useStaticQuery } from "gatsby";
import soup01 from "../../../assets/icon/soup01.png";
import soup02 from "../../../assets/icon/soup02.png"

const SoupTablePage = (props) => {
    const dispatch = useDispatch();
    const isSearchUser = useSelector(userSelector.isSearchUser);
    const isLoading = useSelector(userSelector.isLoading);
    const searchUserInfo = useSelector(userSelector.searchUserInfo);
    const soupList = useSelector(soupSelector.soupList);
    const totalCount = useSelector(soupSelector.totalCount);
    const pageable = useSelector(soupSelector.pageable);
    const [totalPage, setTotalPage] = useState(0);

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
        console.log(soupList[0])
    }, [soupList])

    const afterChange = (page) => {
        dispatch(soupAction.getSoupLoad({ userId: props.params.soupTable, page: page }))
    }
    useEffect(() => {
        dispatch(userAction.getUserLoad({ uid: props.params.soupTable }));
        dispatch(soupAction.getSoupLoad({ userId: props.params.soupTable, page: 0 }))
    }, [])

    useEffect(() => {
        console.log(searchUserInfo);
    }, [searchUserInfo])

    useEffect(() => {
        setTotalPage(Math.ceil(totalCount / pageable.size));
    }, [totalCount])

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
                                        <label>떡국 {totalCount}그릇이 배달됐어요!!</label>
                                    </div>
                                    <div className={style.soupTableBox}>
                                        <Slider {...settings} afterChange={afterChange}>
                                            {totalCount <= 0 ?
                                                <div className={style.soupTable}>
                                                    <img src={"/table.png"} width={350} />
                                                    {/* <StaticImage
                                                        src="../../../assets/img/table.png"
                                                        alt="table"
                                                        loading="eager"
                                                        layout="fixed"
                                                        width={350}
                                                    /> */}
                                                </div>
                                            :
                                            [...Array(totalPage)].map((e, i) => {
                                                return <div className={style.soupTable}>
                                                    <img src={"/table.png"} width={350} />
                                                    {/* <StaticImage
                                                        src="../../../assets/img/table.png"
                                                        alt="table"
                                                        layout="fixed"
                                                        loading="eager"
                                                        width={350}
                                                    /> */}
                                                    
                                                    <div className={style.soupPostion01}>
                                                        {soupList[pageable.page].length > 0 ?
                                                            <img src={"/" + soupList[pageable.page][0]["SOUP_IMG_ID"] + ".png"} width={100} />
                                                            :
                                                            <></>
                                                        }
                                                    </div>
                                                    <div className={style.soupPostion02}>
                                                        {soupList[pageable.page].length > 1 ?
                                                            <img src={"/" + soupList[pageable.page][1]["SOUP_IMG_ID"] + ".png"} width={100} />
                                                            :
                                                            <></>
                                                        }
                                                    </div>
                                                    <div className={style.soupPostion03}>
                                                        {soupList[pageable.page].length > 2 ?
                                                            <img src={"/" + soupList[pageable.page][2]["SOUP_IMG_ID"] + ".png"} width={100} />
                                                            :
                                                            <></>
                                                        }
                                                    </div>
                                                    <div className={style.soupPostion04}>
                                                        {soupList[pageable.page].length > 3 ?
                                                            <img src={"/" + soupList[pageable.page][3]["SOUP_IMG_ID"] + ".png"} width={100} />
                                                            :
                                                            <></>
                                                        }
                                                    </div>
                                                </div>
                                            })}
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