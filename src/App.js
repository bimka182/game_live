import React from 'react';
import {Header} from "./component/Header/Header";
import {Layout} from "./component/Layout/Layout";
import {LiveEnvironment} from "./component/LiveEnvironment/LiveEnvironment";
import {ContentState} from "./context/content/contentState";

function App() {
    return (
        <div className="App">
            {/*Компонент предоставляет контекст для приложения*/}
            {/*Релизацию сделал через reducer, т.к. хотел научиться работать с ним*/}
            {/*Так же в документации есть информация о том, что при выборе useState или useReducer,*/}
            {/*предпочтительнее второй, если неоходимо работать с прошлым состоянием, или  само состояние не примитив а объект*/}
            <ContentState>
                {/*Добавил данный компонент на случай если захочу сделать всплывающее меню*/}
                <Layout>
                    {/*Заголовок приложения*/}
                    <Header/>
                    {/*Игровое поле*/}
                    <LiveEnvironment/>
                </Layout>
            </ContentState>
        </div>
    );
}

export default App;
