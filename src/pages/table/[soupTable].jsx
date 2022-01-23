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
import { navigate } from "gatsby";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
import * as _ from 'lodash'

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
        dispatch(soupAction.clearSoupList());
        dispatch(userAction.getUserLoad({ uid: props.params.soupTable }));
        dispatch(soupAction.getSoupLoad({ userId: props.params.soupTable, page: 0 }))
    }, [])

    // useEffect(() => {
    //     console.log(soupList[pageable.page]);
    // }, [pageable.page])    

    useEffect(() => {
        setTotalPage(Math.ceil(totalCount / pageable.size));
    }, [totalCount])

    const afterChange = (page) => {
        dispatch(soupAction.getSoupLoad({ userId: props.params.soupTable, page: page }))
    }

    const LinkCopy = () => {
        navigator.clipboard.writeText(props.location.href);
        alert("클립보드에 복사되었습니다.")
    }

    const CreateSoup = () => {
        navigate("/tray/" + props.params.soupTable)
    }

    const SoupImg = (position, soupImgId) => {
        const pathReference = ref(storage, `${props.params.soupTable}/${soupImgId}`);

        getDownloadURL(pathReference).then((url) => {
        });
    }

    return (
        <Layout>
            <section className="defaultPanel">
                {isLoading || isSearchUser === undefined ? <div className="loader"></div> :
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
                                                </div>
                                            :
                                                [...Array(totalPage)].map((e, i) => {
                                                return <div key={i} className={style.soupTable}>
                                                    <img src={"/table.png"} width={350} />
                                                    <div className={style.soupPostion01}>
                                                        {soupList[pageable.page].length > 0 ?
                                                            <img src={`https://firebasestorage.googleapis.com/v0/b/newyearsoup.appspot.com/o/${props.params.soupTable}%2F${soupList[pageable.page][0]["SOUP_IMG_ID"]}?alt=media&token=6b4c3e17-e90a-4186-8127-8e07ae9e2daf`} width={100} />
                                                            :
                                                            <div className="loader-white"></div>
                                                        }
                                                    </div>
                                                    <div className={style.soupPostion02}>
                                                        {soupList[pageable.page].length > 1 ?
                                                            <img src={`https://firebasestorage.googleapis.com/v0/b/newyearsoup.appspot.com/o/${props.params.soupTable}%2F${soupList[pageable.page][1]["SOUP_IMG_ID"]}?alt=media&token=6b4c3e17-e90a-4186-8127-8e07ae9e2daf`} width={100} />
                                                            :
                                                            <></>
                                                        }
                                                    </div>
                                                    <div className={style.soupPostion03}>
                                                        {soupList[pageable.page].length > 2 ?
                                                            <img src={`https://firebasestorage.googleapis.com/v0/b/newyearsoup.appspot.com/o/${props.params.soupTable}%2F${soupList[pageable.page][2]["SOUP_IMG_ID"]}?alt=media&token=6b4c3e17-e90a-4186-8127-8e07ae9e2daf`} width={100} />
                                                            :
                                                            <></>
                                                        }
                                                    </div>
                                                    <div className={style.soupPostion04}>
                                                        {soupList[pageable.page].length > 3 ?
                                                            <img src={`https://firebasestorage.googleapis.com/v0/b/newyearsoup.appspot.com/o/${props.params.soupTable}%2F${soupList[pageable.page][3]["SOUP_IMG_ID"]}?alt=media&token=6b4c3e17-e90a-4186-8127-8e07ae9e2daf`} width={100} />
                                                            :
                                                            <></>
                                                        }
                                                    </div>
                                                </div>
                                            })}
                                        </Slider>
                                        <div className={style.btnContainer}>
                                            <button className={style.hoverButton} onClick={LinkCopy}><span>링크 복사하기 </span></button>
                                            <button className={style.hoverButton} onClick={CreateSoup}><span>떡국 전해주기 </span></button>
                                        </div>
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
            style={{ ...style, right: "50px", top: "140px" }}
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