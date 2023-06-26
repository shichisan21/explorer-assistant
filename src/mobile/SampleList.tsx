import React, { useState } from "react";
import ContentList from "../component/ContentList";

type SampleItem = {
  id: number;
  content: Content[];
};

interface Content {
  city: string;
  food: string;
}

const sampleArray: SampleItem[] = [
  {
    id: 1,
    content: [
      {
        city: "kobe",
        food: "beef",
      },
      {
        city: "Tokyo",
        food: "sushi",
      },
    ],
  },
  {
    id: 2,
    content: [
      {
        city: "OOSAKA",
        food: "okonomiyaki",
      },
      {
        city: "Hiroshima",
        food: "okonomiyaki",
      },
    ],
  },
  {
    id: 3,
    content: [
      {
        city: "KYUSYU",
        food: "motu",
      },
      {
        city: "Fukuoka",
        food: "ramen",
      },
    ],
  },
  {
    id: 4,
    content: [
      {
        city: "Tokyo",
        food: "ramen",
      },
      {
        city: "Yokohama",
        food: "ramen",
      },
    ],
  },
];

const SampleList: React.FC = () => {
  const [selectedId, setSelectedId] = useState(1); // 初期値を1として、selectedIdを状態として管理

  const handleChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(event.target.value);
    if (inputValue >= 1 && inputValue <= 4) {
      setSelectedId(inputValue); // 入力値が範囲内の場合にのみselectedIdを更新
    }
  };

  const selectedContent = sampleArray.find(
    (item) => item.id === selectedId
  )?.content;

  if (!selectedContent) {
    return null;
  }

  return (
    <div>
      <div>
        <label>
          選択したID:
          <input
            type='number'
            value={selectedId}
            onChange={handleChangeId}
            min='1'
            max='4'
          />
        </label>
      </div>
      <ContentList content={selectedContent} />
    </div>
  );
};

export default SampleList;
