import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useCallback, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@websim/remotion/player";
import { VideoComposition } from "./composition.jsx";
import { getVideoMetadata, formatTime } from "./utils.js";
import { Trash2, Video, Film, Download, Plus } from "lucide-react";
const FPS = 30;
const App = () => {
  const [videos, setVideos] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({
    width: 1080,
    height: 1920,
    fps: FPS
  });
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("video/"));
    if (files.length === 0) return;
    await processFiles(files);
  };
  const handleFileInput = async (e) => {
    const files = Array.from(e.target.files).filter((f) => f.type.startsWith("video/"));
    if (files.length === 0) return;
    await processFiles(files);
  };
  const processFiles = async (files) => {
    setLoading(true);
    const newVideos = [];
    for (const file of files) {
      try {
        const metadata = await getVideoMetadata(file);
        const src = URL.createObjectURL(file);
        newVideos.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          src,
          name: file.name,
          duration: metadata.durationInSeconds,
          durationInFrames: Math.ceil(metadata.durationInSeconds * FPS),
          width: metadata.width,
          height: metadata.height
        });
      } catch (err) {
        console.error(`Failed to process ${file.name}`, err);
      }
    }
    if (videos.length === 0 && newVideos.length > 0) {
      setConfig((prev) => ({
        ...prev,
        width: newVideos[0].width,
        height: newVideos[0].height
      }));
    }
    setVideos((prev) => [...prev, ...newVideos]);
    setLoading(false);
  };
  const removeVideo = (id) => {
    setVideos((prev) => {
      const video = prev.find((v) => v.id === id);
      if (video) URL.revokeObjectURL(video.src);
      return prev.filter((v) => v.id !== id);
    });
  };
  const totalDurationInFrames = videos.reduce((acc, v) => acc + v.durationInFrames, 0);
  const duration = Math.max(1, totalDurationInFrames);
  return /* @__PURE__ */ jsxDEV("div", { className: "container", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "sidebar", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "title", children: [
        /* @__PURE__ */ jsxDEV(Film, { size: 24, color: "#3b82f6" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 103,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("span", { children: "Clip Stitcher" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 104,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 102,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: `drop-zone ${isDragging ? "dragging" : ""}`,
          onDragOver: handleDragOver,
          onDragLeave: handleDragLeave,
          onDrop: handleDrop,
          onClick: () => document.getElementById("file-input").click(),
          children: [
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "file",
                id: "file-input",
                multiple: true,
                accept: "video/*",
                style: { display: "none" },
                onChange: handleFileInput
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 114,
                columnNumber: 11
              }
            ),
            loading ? /* @__PURE__ */ jsxDEV("div", { children: "Processing..." }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 123,
              columnNumber: 13
            }) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV(Plus, { size: 32, style: { margin: "0 auto 10px", display: "block" } }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 126,
                columnNumber: 15
              }),
              /* @__PURE__ */ jsxDEV("div", { children: [
                "Drop videos here",
                /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 127,
                  columnNumber: 36
                }),
                /* @__PURE__ */ jsxDEV("small", { children: "or click to browse" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 127,
                  columnNumber: 41
                })
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 127,
                columnNumber: 15
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 125,
              columnNumber: 13
            })
          ]
        },
        void 0,
        true,
        {
          fileName: "<stdin>",
          lineNumber: 107,
          columnNumber: 9
        }
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "video-list", children: [
        videos.length === 0 && /* @__PURE__ */ jsxDEV("div", { style: { padding: "1rem", textAlign: "center", color: "#64748b", fontSize: "0.9rem" }, children: "No videos added yet." }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 134,
          columnNumber: 13
        }),
        videos.map((video, index) => /* @__PURE__ */ jsxDEV("div", { className: "video-item", children: [
          /* @__PURE__ */ jsxDEV("div", { style: { color: "#64748b", fontSize: "0.8rem", width: "20px" }, children: index + 1 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 140,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "video-info", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "video-name", children: video.name }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 142,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "video-duration", children: formatTime(video.duration) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 143,
              columnNumber: 17
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 141,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("button", { className: "icon-btn", onClick: () => removeVideo(video.id), children: /* @__PURE__ */ jsxDEV(Trash2, { size: 16 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 146,
            columnNumber: 17
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 145,
            columnNumber: 15
          })
        ] }, video.id, true, {
          fileName: "<stdin>",
          lineNumber: 139,
          columnNumber: 13
        }))
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 132,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "settings-panel", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "setting-row", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Total Duration" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 154,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("span", { children: formatTime(duration / FPS) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 155,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 153,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "setting-row", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Dimensions" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 158,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("span", { children: [
            config.width,
            " x ",
            config.height
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 159,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 157,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { style: { fontSize: "0.75rem", color: "#64748b", marginTop: "0.5rem" }, children: "Note: The output dimensions are set based on the first video you upload." }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 161,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 152,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 101,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "main-content", children: /* @__PURE__ */ jsxDEV("div", { className: "player-wrapper", style: { aspectRatio: `${config.width}/${config.height}` }, children: /* @__PURE__ */ jsxDEV(
      Player,
      {
        component: VideoComposition,
        durationInFrames: duration,
        fps: FPS,
        compositionWidth: config.width,
        compositionHeight: config.height,
        controls: true,
        inputProps: { videos },
        style: { width: "100%", height: "100%" },
        bufferState: loading
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 169,
        columnNumber: 11
      }
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 168,
      columnNumber: 9
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 167,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 100,
    columnNumber: 5
  });
};
createRoot(document.getElementById("app")).render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 186,
  columnNumber: 51
}));
