import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout";
import * as style from "./createsoup.module.css";
import html2canvas from 'html2canvas';
import { trayAction, traySelector } from "./slice";

const CreateSoupPage = (props) => {
    const dispatch = useDispatch();
    const bowl = useSelector(traySelector.bowl);
    const decorations = useSelector(traySelector.decorations);
    const [step, setStep] = useState(0);

    useEffect(() => {
        console.log(props);
    }, [])

    const htmlCanvasTest = () => {
        console.log('onCapcture');
        html2canvas(document.getElementById("test")).then(canvas => {
            onSaveAs(canvas.toDataURL('image/png'), 'image-downlaod.png')
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

    useEffect(() => {
        console.log(decorations)
    }, [decorations])

    const SelectDecoration = (e, decoration) => {
        dispatch(trayAction.setDecoration(decoration));
    }

    const nextBtnClick = () => {
        setStep(step + 1);
    }

    useEffect(() => {
        console.log(step);
    }, [step])

    return (
        <Layout>
            <section className={style.contentsContainer}>
                <div>
                    <div className={style.tray}>
                        <img src={"/tray.png"} width={350} />
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
                        <div className={style.container}>
                            <img src={"/bowls/bowl1.png"} width={350} />
                        </div>
                        <div className={style.container}>
                            <img src={"/bowls/bowl2.png"} width={350} />
                        </div>
                        <div className={style.container}>
                            <img src={"/bowls/bowl3.png"} width={350} />
                        </div>
                        <div className={style.container}>
                            <img src={"/bowls/bowl4.png"} width={350} />
                        </div>
                        <div className={style.container}>
                            <img src={"/bowls/bowl5.png"} width={350} />
                        </div>
                        <div className={style.container}>
                            <img src={"/bowls/bowl6.png"} width={350} />
                        </div>
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
                <div className={style.btnContainer}>
                    <button className={style.madeButton} onClick={nextBtnClick}>다음</button>
                    {/* <button onClick={htmlCanvasTest}>test</button> */}
                </div>
            </section>
        </Layout>
    );
}

export default CreateSoupPage;