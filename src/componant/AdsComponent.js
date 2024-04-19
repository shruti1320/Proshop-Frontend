import React, { useEffect } from "react";

const AdsComponent = (props) => {
  const { dataAdSlot } = props;

  useEffect(() => {
    try {
      // Check if ads have already been pushed to this element
      const insElement = document.querySelector(
        '.adsbygoogle[data-ad-slot="' + dataAdSlot + '"]'
      );
      console.log("ttttttttt",insElement)
      if (insElement && !insElement.hasAttribute("data-adsbygoogle-status")) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("Error pushing ads:", e);
    }
    console.log("eeeeeeeeeeeeeeeeeeeeeeeee")
  }, [dataAdSlot]);


  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8988947480353212"
        data-ad-slot="8010254246"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
};

export default AdsComponent;
