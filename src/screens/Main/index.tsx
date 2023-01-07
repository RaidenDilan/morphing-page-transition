import React, { useEffect, useRef, useState } from 'react';
import './Main.scss';
import anime from 'animejs';
import charming from 'charming';
import imagesLoaded from 'imagesloaded';

const Main = () => {
  const [loaded, setLoaded] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const shapeRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const enterRef = useRef<HTMLAnchorElement>(null);

  let enterLetters: Element[];
  let enterTimeoutId: ReturnType<typeof setTimeout>;

  const navigate = () => {
    if (loaded) return;
    setLoaded(true);

    anime({
      targets: introRef.current,
      duration: 1600,
      easing: 'easeInOutCubic',
      translateY: '-200vh',
    });

    anime({
      targets: shapeRef.current,
      easing: 'easeInOutCubic',
      scaleY: [
        { value: [0, 1], duration: 800 },
        { value: 0, duration: 1200, easing: 'easeOutElastic', elasticity: 700 },
      ],
    });

    anime({
      targets: pathRef.current,
      duration: 800,
      easing: 'easeInOutQuad',
      d: pathRef.current?.getAttribute('path'),
    });

    anime({
      targets: [
        introRef.current?.querySelector('.content__inner'),
        shapeRef.current,
      ],
      duration: 1300,
      easing: 'linear',
      backgroundColor: (t: HTMLElement, i: number) => {
        if (i === 0) return '#fff1fb';
      },
      fill: (t: HTMLElement, i: number) => {
        if (i === 1) return '#fff1fb';
      },
    });
  };

  const enterHoverIn = () =>
    (enterTimeoutId = setTimeout(() => {
      setIsActive(true);
      anime.remove(enterLetters);
      anime({
        targets: enterLetters,
        delay: (t: HTMLElement, i: number) => i * 15,
        translateY: [
          { value: 10, duration: 150, easing: 'easeInQuad' },
          { value: [-10, 0], duration: 150, easing: 'easeOutQuad' },
        ],
        opacity: [
          { value: 0, duration: 150, easing: 'linear' },
          { value: 1, duration: 150, easing: 'linear' },
        ],
        color: {
          value: '#ffffff',
          duration: 1,
          delay: (t: HTMLElement, i: number, l: number) => i * 15 + 150,
        },
      });
    }, 50));

  const enterHoverOut = () => {
    clearTimeout(enterTimeoutId);
    if (!isActive) return;
    setIsActive(false);
    anime.remove(enterLetters);
    anime({
      targets: enterLetters,
      delay: (t: HTMLElement, i: number, l: number) => (l - i - 1) * 15,
      translateY: [
        { value: 10, duration: 150, easing: 'easeInQuad' },
        { value: [-10, 0], duration: 150, easing: 'easeOutQuad' },
      ],
      opacity: [
        { value: 0, duration: 150, easing: 'linear' },
        { value: 1, duration: 150, easing: 'linear' },
      ],
      color: {
        value: '#f470d2',
        duration: 1,
        delay: (t: HTMLElement, i: number, l: number) => (l - i - 1) * 15 + 150,
      },
    });
  };

  useEffect(() => {
    charming(enterRef.current);

    if (enterRef.current) {
      enterLetters = Array.from(enterRef.current.querySelectorAll('span'));
      enterRef.current.addEventListener('click', navigate);
      enterRef.current.addEventListener('touchenter', navigate);
      enterRef.current.addEventListener('mouseenter', enterHoverIn);
      enterRef.current.addEventListener('mouseleave', enterHoverOut);
    }

    if (shapeRef.current) {
      shapeRef.current.style.transformOrigin = '50% 0%';
    }

    imagesLoaded(document.body, { background: true }, () =>
      document.body.classList.remove('loading'),
    );

    return () => {
      enterRef.current?.removeEventListener('click', navigate);
      enterRef.current?.removeEventListener('touchenter', navigate);
      enterRef.current?.removeEventListener('mouseenter', enterHoverIn);
      enterRef.current?.removeEventListener('mouseleave', enterHoverOut);
    };
  }, []);

  return (
    <main className="Main">
      <div className="content content--intro" ref={introRef}>
        <div className="content__inner">
          <h2 className="content__title">The Pink Balloon</h2>
          <h3 className="content__subtitle">Candy Artisans</h3>
          <a href="#" className="enter" ref={enterRef}>
            enter
          </a>
        </div>
        <div className="shape-wrap">
          <svg
            ref={shapeRef}
            className="shape"
            width="100%"
            height="100vh"
            preserveAspectRatio="none"
            viewBox="0 0 1440 800"
            xmlns="http://www.codrops.com/"
          >
            <path
              ref={pathRef}
              d="M 73.3,178.6 C 101.7,363.8 76.38,735 118.7,813.8 161,892.7 327.3,946.7 381.1,853.3 434.9,759.9 427.2,488.9 436.8,341.5 443.3,241.3 447.3,33.05 516.1,36.19 574.9,38.88 611.6,214.9 622.3,429.7 633,644.6 614.7,796.1 688.1,849 761.6,901.8 860.7,873.7 897.6,850 982.3,795.5 951.2,639.3 961.1,506.1 970.9,372.9 958.5,43.53 1023,43.47 1063,43.43 1085,173.6 1095,370.7 1105,567.8 1082,804.3 1165,842.6 1197,857.5 1304,901 1342,833 1380,765 1354,413.7 1379,156.2 1407,-137.5 1719,-12.96 1719,-12.96 L -53.5,-44.66 C -53.5,-44.66 44.91,-6.65 73.3,178.6 Z"
              path="M 105.3,190.6 C 159.7,353.8 143.2,774.2 149.1,779.5 155,784.8 159.4,782 164.8,778.2 170.2,774.4 168.9,242.8 240.3,125 311.7,7.205 430.7,2.307 564.2,13.56 707.9,25.67 806,166.3 800.5,376 804.7,587.3 801.2,773.9 807.1,782.7 813,791.4 816.8,792.7 821.4,786 826.4,778.8 819.4,566.3 820.3,498.1 821.2,429.9 781.4,95.51 992.5,74.58 1108,63.14 1235,166.4 1250,359.4 1265,552.4 1248,763.7 1271,781.4 1277,786 1281,786.2 1286,779.7 1292,773.2 1260,251.3 1355,103.9 1441,-30.35 1610,-117.6 1610,-117.6 L -110.1,-132.3 C -110.1,-132.3 50.91,27.35 105.3,190.6 Z"
            ></path>
          </svg>
        </div>
      </div>
      <div className="content content--fixed">
        <div className="content__inner"></div>
      </div>
    </main>
  );
};

export default Main;
