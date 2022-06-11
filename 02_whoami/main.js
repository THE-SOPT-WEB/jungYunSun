import pic1 from "./assets/김규민.jpeg";
import pic2 from "./assets/전희선.jpeg";
import pic3 from "./assets/서혜은.jpg";
import pic4 from "./assets/황주희.jpeg";
import pic5 from "./assets/백지연.png";

const $ = (selector) => document.querySelector(selector);
// 매번 querySelector 쓰기 귀찮아서..

let currentStep = 0;

const quizList = [
  {
    src: pic1,
    answer: "김규민",
  },
  {
    src: pic2,
    answer: "전희선",
  },
  {
    src: pic3,
    answer: "서혜은",
  },
  {
    src: pic4,
    answer: "황주희",
  },
  {
    src: pic5,
    answer: "백지연",
  },
];

function initGame({score, image}) {
  const modal = $('.modal');
  showModal('이미지 로딩중...', true);
  currentStep = 0;
  score.innerText = 0;

  image.src = quizList[currentStep].src;
  image.addEventListener('load', () => {
    modal.classList.add('hide');
  });
}

function showModal(modalContent, keepOpen) {
  const modal = $('.modal');
  const modalBody = $('p.modal__body');
  modalBody.innerHTML = modalContent;

  modal.classList.remove('hide');

  if (keepOpen) return;

  const hideModal = () => {
    modal.classList.add('hide');
    modal.removeEventListener('click', hideModal);
  }

  modalBody.addEventListener('click', (e) => {
    e.stopPropagation();
  })
  modal.addEventListener('click', hideModal);

  setTimeout(hideModal, 1000);

}

function goNextStep(score, image) {
  /*
    점수 올리기,
    이미지 바꿔주기
    이미지 바꾸는 동안 로딩중 띄워주기
  */
  const modal = $('.modal');
  const scoreBoard = $('.scoreBoard');

  currentStep++;
  score.innerText = Number(score.innerText) + 1;
  if(scoreBoard.classList.contains('scored'))
    scoreBoard.classList.remove('scored');
  void scoreBoard.offsetWidth;
  scoreBoard.classList.add('scored');

  if (currentStep === quizList.length) {
    // 게임이 끝난 상태. 
    showModal(`
      <a href="/">메인화면으로</a>
    `, true);
    return;
  }

  showModal('이미지 로딩중...', true);
  image.src = quizList[currentStep].src;
  image.addEventListener('load', () => {
    modal.classList.add('hide');
  })
}

function attachEvent({score, answer, image}) {
  answer.addEventListener('click', (e) => {
    if (e.target instanceof HTMLLIElement) {
      const currentAnswer = e.target.innerText;
      const realAnswer = quizList[currentStep].answer;
      if (currentAnswer === realAnswer) {
        // 정답
        goNextStep(score, image);
      } else {
        // 오답
        showModal(`난 ${currentAnswer}이(가) 아니야!!!`, false);
      }
    }
  })
}

function gameManager(gameInfo) {
  initGame(gameInfo);
  attachEvent(gameInfo);
}

window.addEventListener('load', () => {
  gameManager({
    score: $('.scoreBoard__score'),
    answer: $('ul.answer__list'),
    image: $('.imageBoard > img')
  });
})

