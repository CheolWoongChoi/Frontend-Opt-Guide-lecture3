import React, { useEffect, useRef } from "react";

export default function TwoColumnsImage(props) {
  const imgRef = useRef(null);

  useEffect(() => {
    const options = {};
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const webpSource = target.previousSibling;

          target.src = target.dataset.src;
          webpSource.srcset = webpSource.dataset.srcset;
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <picture>
      <source data-srcset={props.webp} type="image/webp" />
      <img data-src={props.image} ref={imgRef} />
    </picture>
  );
}
