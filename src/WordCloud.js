import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import "echarts-wordcloud";
import supabase from "./supabase";

function WordCloud() {
  const [wordCloudData, setWordCloudData] = useState([]);

  useEffect(() => {
    async function fetchWordCloudData() {
      try {
        const { data, error } = await supabase.from("facts").select("*");

        if (error) {
          console.error("Error fetching data from Supabase:", error);
        } else {
          // Count word occurrences and calculate frequency
          const wordCount = {};
          data.forEach((item) => {
            const words = item.text.split(/\s+/); // Split text into words
            words.forEach((word) => {
              wordCount[word] = (wordCount[word] || 0) + item.votesInteresting;
            });
          });

          // Transform data for word cloud
          const formattedData = Object.entries(wordCount).map(
            ([word, frequency]) => ({
              name: word,
              value: frequency,
            })
          );

          setWordCloudData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data from Supabase:", error.message);
      }
    }

    fetchWordCloudData();
  }, []);

  useEffect(() => {
    // Initialize and render the word cloud using echarts
    const myChart = echarts.init(document.getElementById("wordcloud"));
    const option = {
      series: [
        {
          type: "wordCloud",
          shape: "circle",
          gridSize: 5,
          sizeRange: [10, 40],
          rotationRange: [0, 0],
          textStyle: {
            normal: {
              color: function () {
                return (
                  "rgb(" +
                  Math.round(Math.random() * 255) +
                  "," +
                  Math.round(Math.random() * 255) +
                  "," +
                  Math.round(Math.random() * 255) +
                  ")"
                );
              },
            },
          },
          data: wordCloudData,
        },
      ],
    };
    myChart.setOption(option);

    // Clean up the chart on component unmount
    return () => {
      myChart.dispose();
    };
  }, [wordCloudData]);

  return <div id="wordcloud" style={{ height: "300px" }}></div>;
}

export default WordCloud;
