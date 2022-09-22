import './index.css';
import React, {useState} from "react";

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];
/*13*/
function Result({correct}) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Вы отгадали {correct} ответа из {questions.length}</h2>
        {/*14*/}
        <a href='/'>
            <button>Попробовать снова</button>
        </a>
    </div>
  );
}
/*3 Вытаскиваем из пропсов question и отрисовываем его в заголовке
* 6 onClickVariant -  Вытаскиваем  и отрисовываем его. В консоди д б виден индекс выбранного варика
* 8 - progresBar                                        */
function Game({ step, question, onClickVariant}) {
    const percent = Math.round((step / questions.length * 100));
    console.log(percent);
  return (
    <div>
      <div className="progress">
        <div style={{ width: `${percent}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
          {/*4 Рендерим варианты */}
          {
             question.variants.map((text, index) => <li onClick={() => onClickVariant(index)} key={text}>{text}</li>)
          }
      </ul>
    </div>
  );
}

function App() {
    //1 - стэйт для шага(для индекса ответа)
    const [step, setStep] = useState(0);
    const question = questions[step];
    /*10 определить количество корректных вариантов*/
    const [correct, setCorrect] = useState(0);

    /*5*/
    const onClickVariant = (index) => {
        console.log(step, index);
        //7 перейти на следующий шаг
       /*11 считаем количество корректных*/
        setStep(step + 1); //будет переход на след вопрос при клике на любой варик
        if (index === question.correct) {
            setCorrect(correct + 1);
        }
    }

  return (
    <div className="App">
        {/*9 проверка и отображение результата*/}
       {/*2 передать шаг в компонент*/}
        {/*12 передать в Result количество правильных вариков*/}
        {
            step !== questions.length
                ? <Game step={step} question={question} onClickVariant={onClickVariant}/>
                : <Result correct={correct}/>

        }
    </div>
  );
}

export default App;
