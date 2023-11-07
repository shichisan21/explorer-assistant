import React, { useState } from "react";
import { Button } from "@mui/material";

type Person = {
  Name: string;
  Money: number;
};

const SortComponent: React.FC = () => {
  // 初期状態でランダムなMoney値を持つ20のオブジェクトを生成します
  const [people, setPeople] = useState<Person[]>(
    Array.from({ length: 20 }, () => ({
      Name: `Name${Math.random().toString(36).substring(2, 15)}`,
      Money: Math.floor(Math.random() * 99999) + 1,
    }))
  );

  // 昇順に並べ替える関数
  const sortAscending = () => {
    const sorted = [...people].sort((a, b) => a.Money - b.Money);
    setPeople(sorted);
  };

  // 降順に並べ替える関数
  const sortDescending = () => {
    const sorted = [...people].sort((a, b) => b.Money - a.Money);
    setPeople(sorted);
  };

  return (
    <div>
      <Button variant='contained' onClick={sortAscending}>
        昇順
      </Button>
      <Button variant='contained' onClick={sortDescending}>
        降順
      </Button>
      <ul>
        {people.map((person, index) => (
          <li key={index}>{`${person.Name} : ${person.Money}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default SortComponent;
