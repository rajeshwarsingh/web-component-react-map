import React from 'react';
import ReactDOM from 'react-dom';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const steps = [
    {
        status: "created",
        img: "./resource/svg/icon/dest.png"
    },
    {
        status: "pendingApproval",
        img: "./resource/svg/icon/dest.png"
    },
    {
        status: "pending",
        img: "./resource/svg/icon/dest.png"
    },
    {
        status: "complete",
        img: "./resource/svg/icon/dest.png"
    }
];

export default function App() {
    const transfer = {
        status: "approved" // change transfer status to progress bar
    };

    const getStepPosition = (transferStatus) => {
        return steps.findIndex(({ status }) => status === transferStatus);
    };

    return (
        <>
            <div style={{ margin: 50 }}>
                <ProgressBar
                    width={750}
                    percent={
                        100
                    }
                    filledBackground="linear-gradient(to right, #4B9E87, #4B9E87)"
                >
                    <Step
                        transition="scale"
                        children={({ accomplished }) => (
                            <div
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: 20,
                                    backgroundColor: accomplished ? "" : "gray"
                                }}
                            >
                                <div style={{ margin: '-30px 0 0 0' }}><img src={require(`${'./resource/svg/icon/order recived.png'}`).default} /><br /></div>
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: "12px" }}>Order Received</div>
                                    <div style={{ fontSize: "10px" }}>1/15/2022</div>
                                </div>
                            </div>

                        )}
                    />
                    <Step
                        transition="scale"
                        children={({ accomplished }) => (
                            <div
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: 20,
                                    backgroundColor: accomplished ? "" : "gray"
                                }}
                            >

                                <div style={{ margin: '-30px 0 0 0' }}><img src={require(`${'./resource/svg/icon/order loaded.png'}`).default} /><br /></div>
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: "12px" }}>Order Received</div>
                                    <div style={{ fontSize: "10px" }}>1/15/2022</div>
                                </div>
                            </div>
                        )}
                    />
                    <Step
                        transition="scale"
                        children={({ accomplished }) => (
                            <div
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: 20,
                                    backgroundColor: accomplished ? "" : "gray"
                                }}
                            >

                                <div style={{ margin: '-30px 0 0 0' }}>
                                    <img src={require(`${'./resource/svg/icon/order shipped.png'}`).default} /><br />
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: "12px" }}>Order Shiped</div>
                                    <div style={{ fontSize: "10px" }}>1/15/2022</div>
                                </div>
                            </div>
                        )}
                    />
                    <Step
                        transition="scale"
                        children={({ accomplished }) => (
                            <div
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: 20,
                                    backgroundColor: accomplished ? "" : "gray"
                                }}
                            >

                                <div style={{ margin: '-30px 0 0 0' }}>
                                    <img src={require(`${'./resource/svg/icon/dest.png'}`).default} /><br />
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: "12px" }}>Destination</div>
                                    <div style={{ fontSize: "10px" }}>1/30/2022</div>
                                </div>
                            </div>
                        )}
                    />

                </ProgressBar>
            </div>
        </>
    );
}