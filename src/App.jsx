import { useState } from "react"
import cardsData from "./cardsData"
import ParticlesBackground from "./components/ParticlesBackground"






function App() {
  // esta estado tiene como parametro desordenar un arreglo  
  const [cardsLiss, setCardsLiss] = useState(cardsData.sort(() => Math.random() - 0.5));
  const [prevIndexCard, setPrevIndexCard] = useState(-1);
  const [isDisabled, setIsDisabled] = useState(false); // Nuevo estado para habilitar o deshabilitar la selección de cartas

  const selectCard = index => {
    // Si ya tienes dos cartas en estado "selected", no se hace nada
    if (cardsLiss.filter(card => card.status === "selected").length === 2) {
      return;
    }

    cardsLiss[index].status = "selected";
    setCardsLiss([...cardsLiss]);

    if (prevIndexCard === -1) {
      setPrevIndexCard(index);
    } else {
      validateCard(index);
    }
  }

  const validateCard = newindex => {
    const prev = cardsLiss[prevIndexCard];
    const current = cardsLiss[newindex];

    setTimeout(() => {
      if (prev.icon === current.icon) {
        prev.status = "up";
        current.status = "up";
      } else {
        prev.status = "down";
        current.status = "down";
      }

      setCardsLiss([...cardsLiss]);
      setPrevIndexCard(-1);

      // Habilitar nuevamente la selección de cartas después de 1 segundo
      setIsDisabled(true);
      setTimeout(() => {
        setIsDisabled(false);
      }, 1000);
    }, 1000);
  }


  return (
    <div className="h-screen w-full fixed top-0 left-0 z-[-1] bg-gradient-to-b from-black via-green-900 to-green-600">
      <ParticlesBackground />

      <h1 className="text-center mt-[150px] sm:mt-20 text-lg sm:text-xl font-bold text-white">Juego de memorias</h1>

      <div className="grid grid-cols-4 sm:grid-cols-4 h-[300px] sm:h-[400px] w-[300px] sm:w-[400px] text-center m-auto mt-10 gap-2 sm:gap-4 cursor-pointer relative border-[2px] p-4 sm:p-6 z-99">
        {cardsLiss.map((card, i) => {
          let cardClass =
            'flex flex-col bg-blue-300 justify-center items-center text-[16px] sm:text-[20px] rounded-full ';

          if (card.status === 'up') {
            cardClass += 'bg-green-500';
          } else if (card.status === 'selected') {
            cardClass += 'bg-red-500';
          }

          return (
            <div key={card.id} className={cardClass} onClick={() => selectCard(i)}>
              {card.status !== 'down' && <i className={card.icon}></i>}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default App
