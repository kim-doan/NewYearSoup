import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout";
import * as style from "./createsoup.module.css";
import html2canvas from 'html2canvas';
import { trayAction, traySelector } from "./slice";
import { navigate } from "gatsby";
import { storage } from "../../firebase"
import { v4 as uuidv4 } from "uuid";
import { soupAction } from "../table/slice";
import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { userAction, userSelector } from "../auth/slice";
    
const CreateSoupPage = (props) => {
    const dispatch = useDispatch();
    const bowl = useSelector(traySelector.bowl);
    const decorations = useSelector(traySelector.decorations);
    const authUser = useSelector(userSelector.authUser);
    const isAuthUserLoad = useSelector(userSelector.isAuthUserLoad);
    const [step, setStep] = useState(0);
    const [progress, setProgress] = useState(null);

    useEffect(() => {
        setStep(0);
        dispatch(userAction.getUserLoad({ uid: props.params.createSoup }));
        dispatch(soupAction.getSoupLoad({ userId: props.params.createSoup, page: 0 }))
    }, [])

    useEffect(() => {
        console.log(props);
        console.log(authUser);
        if (isAuthUserLoad) {
            if (!authUser) {
                navigate("/auth/login", { state: { redirect: props.location.pathname } });
            }
        }
    }, [isAuthUserLoad])

    const SelectBowl = (e, bowl) => {
        dispatch(trayAction.setBowl(bowl));
    }

    const SelectDecoration = (e, decoration) => {
        dispatch(trayAction.setDecoration(decoration));
    }

    const prevBtnClick = () => {
        if (step <= 0) {
            navigate(-1);   
        } else {
            setStep(step - 1);
        }
    }

    const nextBtnClick = () => {
        setStep(step + 1);
    }

    const confirmBtnClick = () => {
        html2canvas(document.getElementById("test"), { backgroundColor: null }).then(canvas => {
            const storageRef = ref(storage, `${props.params.createSoup}/${uuidv4()}.png`);
            var blobData = dataURItoBlob(canvas.toDataURL('image/png'));

            const uploadTask = uploadBytesResumable(storageRef, blobData);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);

                    switch (snapshot.state) {
                        case 'paused':
                            console.log(console.log('Upload is paused'));
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    alert("떡국 이미지 업로드에 실패했습니다.");
                },
                () => {
                    dispatch(trayAction.setSoupImgId(storageRef.name));
                    dispatch(soupAction.addSoupLoad());
                }
            )
        });      
    }
    
    const onSaveAs = (uri, filename) => {
        var link = document.createElement('a');
        document.body.appendChild(link);

        link.href = uri;
        link.download = filename
        link.click();
        document.body.removeChild(link);
    }

    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type:mimeString});
    }

    return (
        <Layout>
            <section className={style.contentsContainer}>
                <div>
                    <div className={style.tray}>
                        <img src={"/tray.png"} width={320} />
                        <div id="test" className={style.bowl}>
                            <img src={`/soups/${bowl}.png`} width={200} />
                            {decorations.map((e, i) => {
                                return <div key={i} className={style.decoration}>
                                    <img src={`/decorations/${e}.png`} width={200} />
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                {step === 0 ?
                    <div className={style.sideMenuContainer}>
                        {[...Array(6)].map((e, i) => {
                            var name = "bowl" + (i + 1);
                            return <div key={i} className={style.container} onClick={(e => SelectBowl(e, name))}>
                                {bowl !== name ?
                                    <img src={`/bowls/${name}.png`} width={350} />
                                    :
                                    <></>
                                }
                            </div>
                        })}
                    </div>
                    : <></>
                }
                {step === 1 ?
                    <div className={style.sideMenuContainer}>
                        <div className={style.container}>
                            <img src={"/sideTray.png"} width={350} />
                        </div>
                        <div className={style.container} onClick={(e) => SelectDecoration(e, "meat")}>
                            <div className={style.sideTray}>
                                <img src={"/sideTray.png"} width={350} />
                                {!decorations.includes("meat") ?
                                    <div className={style.sideMenu}>
                                        <img src={"/meat.png"} width={60} />
                                    </div>
                                    : <></>
                                }
                            </div>
                        </div>
                        <div className={style.container}>
                            <div className={style.sideTray} onClick={(e) => SelectDecoration(e, "pepper")}>
                                <img src={"/sideTray.png"} width={350} />
                                {!decorations.includes("pepper") ?
                                    <div className={style.sideMenu}>
                                        <img src={"/pepper.png"} width={100} />
                                    </div>
                                    : <></>
                                }
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
                    : <></>
                }
                {step === 2 ? 
                    <div className={style.messageContainer}>
                        <div className={style.scrollContainer}>
                            {/* <img src={"/scroll.png"} width={320} /> */}
                            <div className={style.inputArea}>
                                <textarea
                                    className={style.inputTransParent}
                                    spellCheck={false}
                                    placeholder="200자 이내로 입력해주세요."
                                    onChange={(e) => dispatch(trayAction.setMessage(e.target.value))}></textarea>
                                </div>
                        </div>
                    </div>
                :<></>}
                <div className={style.btnContainer}>
                    <button className={style.madeButton} onClick={prevBtnClick}>이전</button>
                    {step <= 1 ?
                        <button className={style.madeButton} onClick={nextBtnClick}>다음</button>
                        :
                        <button className={style.madeButton} onClick={confirmBtnClick}>전해주기</button>
                    }
                    {/* <button onClick={htmlCanvasTest}>test</button> */}
                </div>
            </section>
        </Layout>
    );
}

export default CreateSoupPage;