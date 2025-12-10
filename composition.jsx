import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { Series, OffthreadVideo, AbsoluteFill } from "remotion";
const VideoComposition = ({ videos }) => {
  if (!videos || videos.length === 0) {
    return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: {
      backgroundColor: "#0f172a",
      justifyContent: "center",
      alignItems: "center",
      color: "#94a3b8",
      fontSize: "40px",
      textAlign: "center",
      padding: "20px"
    }, children: /* @__PURE__ */ jsxDEV("div", { children: "Drag & Drop Videos" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 16,
      columnNumber: 9
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 7,
      columnNumber: 7
    });
  }
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { backgroundColor: "black" }, children: /* @__PURE__ */ jsxDEV(Series, { children: videos.map((video) => /* @__PURE__ */ jsxDEV(
    Series.Sequence,
    {
      durationInFrames: Math.ceil(video.durationInFrames),
      layout: "none",
      children: /* @__PURE__ */ jsxDEV(
        OffthreadVideo,
        {
          src: video.src,
          style: {
            height: "100%",
            width: "100%",
            objectFit: "contain"
          }
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 30,
          columnNumber: 14
        }
      )
    },
    video.id,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 25,
      columnNumber: 11
    }
  )) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 23,
    columnNumber: 7
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 22,
    columnNumber: 5
  });
};
export {
  VideoComposition
};
