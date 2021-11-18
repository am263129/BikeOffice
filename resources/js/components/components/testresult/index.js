import React from "react";

const TestResult = (props) => {
    const { answer } = props;
    return (
        <>
            {answer > 20 ? (
                <div className="rounded-lg px-4 items-center items-center flex h-14 bg-red-300">
                    <p>Sou do tipo 1, posso fazer um percurso leve</p>
                </div>
            ) : answer > 10 ? (
                <div className="rounded-lg px-4 items-center items-center flex h-14 bg-yellow-300">
                    <p>Sou do tipo 3, posso fazer um percurso moderado</p>
                </div>
            ) : (
                <div className="rounded-lg px-4 items-center items-center flex h-14 bg-green-300">
                    <p>Sou do tipo 5, posso fazer um percurso difícil</p>
                </div>
            )}
        </>
    );
};

export default TestResult;
