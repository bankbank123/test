import '../css/TopicCard.css';
import ArUp from '../assets/arrow_up.png'
import { useState, useEffect } from 'react';
const Text = [
  { header: "header 1", content: "content 1" },
  { header: "header 2", content: "content 2" },
  { header: "header 3", content: "content 3" },
  { header: "header 4", content: "content 4" },
  { header: "header 5", content: "content 5" },
  { header: "header 6", content: "content 6" },
  { header: "header 7", content: "content 7" },
  { header: "header 8", content: "content 8" },
]
export default function TopicCard() {

  const [startIndex, setStartIndex] = useState(() => {
    const storedIndex = localStorage.getItem('currentCardIndex');
    return storedIndex ? parseInt(storedIndex, 10) : 0;
  });

  const [visibleText, setVisibility] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const isWindowTiny = window.innerWidth <= 665;
      const isWindowSmall = window.innerWidth <= 925 && window.innerWidth > 665;
      const isWindowMedium = window.innerWidth <= 1190 && window.innerWidth > 925;
      const isWindowLarge = window.innerWidth > 1190;

      const newStartIndex = isWindowTiny
        ? startIndex
        : Math.min(startIndex, Text.length - (isWindowMedium ? 2 : isWindowLarge ? 4 : 3));

      setStartIndex(newStartIndex);
      setVisibility(
        Text.slice(newStartIndex, newStartIndex + (isWindowTiny ? 1 : isWindowSmall ? 2 : isWindowMedium ? 3 : 4))
      );
    };
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [startIndex]);


  const animation_card = () => {
    const visibleTextIds = visibleText.map((text, index) => `card-${index + 1}`)
    visibleTextIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        return element.classList.add('animate-fadeChange')
      }
    })
    document.addEventListener("animationend", () => {
      visibleTextIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          return element.classList.remove('animate-fadeChange')
        }
      })
    })
  }

  const handlecardChange_left = () => {
    if (startIndex + (window.innerWidth > 1440 ? 4 : window.innerWidth <= 1440 && window.innerWidth > 925 ? 3 : window.innerWidth <= 925 && window.innerWidth > 665 ? 2 : 1) >= Text.length) {
      return;
    }
    animation_card();
    setStartIndex((prevIndex) => prevIndex + (window.innerWidth > 1440 ? 4 : window.innerWidth <= 1440 && window.innerWidth > 925 ? 3 : window.innerWidth <= 925 && window.innerWidth > 665 ? 2 : 1));
  };

  const handlecardChange_right = () => {
    if (startIndex - (window.innerWidth > 1440 ? 4 : window.innerWidth <= 1440 && window.innerWidth > 925 ? 3 : window.innerWidth <= 925 && window.innerWidth > 665 ? 2 : 1) < 0) {
      return;
    }
    animation_card();
    setStartIndex((prevIndex) => prevIndex - (window.innerWidth > 1440 ? 4 : window.innerWidth <= 1440 && window.innerWidth > 925 ? 3 : window.innerWidth <= 925 && window.innerWidth > 665 ? 2 : 1));
  };

  return (

    <div className="topic-card-container">
      <div className="topic-header-container">
        ทั่วไป
      </div>

      <div className="card-container">
        <img src={ArUp} alt="Arrow-Left" className='Arrow-left Arrow' onClick={handlecardChange_left} />

        {visibleText.map((text, index) => (
          <div className="card-cover" id={`card-${index + 1}`} key={index}>
            <div className="topic-card-header">
              <h1>{text.header}</h1>
            </div>
            <div className="topic-card-body child-1">
              <p>{text.content}</p>
            </div>
          </div>
        ))}
        <img src={ArUp} alt="Arrow-Right" className='Arrow-right Arrow' onClick={handlecardChange_right} />
      </div>

    </div>

  );
}
