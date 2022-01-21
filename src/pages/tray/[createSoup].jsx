import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout";
import * as style from "./createsoup.module.css";
import html2canvas from 'html2canvas';
import { trayAction, traySelector } from "./slice";
import { navigate } from "gatsby";
import AWS from 'aws-sdk';
import { Buffer } from 'buffer';

const CreateSoupPage = (props) => {
    const dispatch = useDispatch();
    const bowl = useSelector(traySelector.bowl);
    const decorations = useSelector(traySelector.decorations);
    const [step, setStep] = useState(0);
     const [progress , setProgress] = useState(0);

    // const S3Config = {
    //     bucketName: process.env.GATSBY_AWS_S3_BUCKET_NAME,
    //     region: process.env.GATSBY_AWS_S3_BUCKET_REGION,
    //     accessKeyId: process.env.GATSBY_AWS_S3_ACCESS_KEY,
    //     secretAccessKey: process.env.GATSBY_AWS_S3_SECRET_KEY
    // }
    AWS.config.update({
        accessKeyId: process.env.GATSBY_AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.GATSBY_AWS_S3_SECRET_KEY
    })

    const myBucket = new AWS.S3({
        params: { Bucket: "new-year-soup" },
        region: process.env.GATSBY_AWS_S3_BUCKET_REGION
    })

    useEffect(() => {
        console.log(props);
        setStep(0);
    }, [])

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
        html2canvas(document.getElementById("test")).then(canvas => {
            // onSaveAs(canvas.toDataURL('image/png'), 'image-downlaod.png')

            var blobData = canvas.toBlob((blob) => {
                if (blob === null) return;
                var params = {  ACL: 'public-read', Key: "test", ContentType: "image/png", Body: blob };
                S3Upload(params);
            }, "image/png")
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

    const S3Upload = async (url) => {
        console.log(url);

        myBucket.putObject(url)
            .on('httpUploadProgress', (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100))
            }).send((err) => {
                console.log(err);
        })
        // await uploadFile(url, S3Config)
        //     .then(data => console.log(data))
        //     .catch(err => console.log(err))
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