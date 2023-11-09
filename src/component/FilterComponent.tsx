import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Checkbox,
} from "@mui/material";

// 商品オブジェクトの型を定義
type Product = {
  Name: string;
  Type: "野菜" | "肉" | "魚";
  Place: string;
  Range: string;
  Price: number;
};

// 商品オブジェクトの配列を生成する関数
const generateProducts = (): Product[] => {
  const types: Product["Type"][] = ["野菜", "肉", "魚"];
  const places: Product["Place"][] = [
    "コンビニ",
    "スーパー",
    "道の駅",
    "ネット",
  ];
  const ranges: Product["Range"][] = ["High", "Middle", "Low", "Middle-High"];

  return Array.from(
    { length: 20 },
    (): Product => ({
      Name: `Product ${Math.random().toString(36).substring(7)}`,
      Type: types[Math.floor(Math.random() * types.length)],
      Place: places[Math.floor(Math.random() * places.length)],
      Range: ranges[Math.floor(Math.random() * ranges.length)],
      Price: Math.floor(Math.random() * 500) + 100, // 100円から500円のランダムな価格
    })
  );
};

// 商品リストを表示するコンポーネント
const FilterComponent: React.FC = () => {
  const [products] = useState<Product[]>(generateProducts());
  const [typeFilter, setTypeFilter] = useState<"野菜" | "肉" | "魚" | "">("");
  const [placeFilter, setPlaceFilter] = useState<string>("");
  const [rangeFilter, setRangeFilter] = useState<string>("");
  const [isPlaceFilterActive, setIsPlaceFilterActive] = useState(false);
  const [isRangeFilterActive, setIsRangeFilterActive] = useState(false);
  const [uniquePlaces, setUniquePlaces] = useState<string[]>([]);
  const [uniqueRanges, setUniqueRanges] = useState<string[]>([]);

  // 初回レンダリング時に一意なPlaceとRangeのリストを設定
  useEffect(() => {
    const placeSet = new Set(products.map((product) => product.Place));
    const rangeSet = new Set(products.map((product) => product.Range));
    setUniquePlaces(Array.from(placeSet));
    setUniqueRanges(Array.from(rangeSet));
  }, [products]);

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeFilter(event.target.value as "野菜" | "肉" | "魚");
  };

  const handlePlaceChange = (event: SelectChangeEvent<Product["Place"]>) => {
    setPlaceFilter(event.target.value as Product["Place"]);
  };

  const handleRangeChange = (event: SelectChangeEvent<Product["Range"]>) => {
    setRangeFilter(event.target.value as Product["Range"]);
  };

  const handlePlaceFilterActivation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsPlaceFilterActive(event.target.checked);
  };

  const handleRangeFilterActivation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsRangeFilterActive(event.target.checked);
  };

  const filteredProducts = products.filter((product) => {
    return (
      (typeFilter ? product.Type === typeFilter : true) &&
      (isPlaceFilterActive
        ? placeFilter
          ? product.Place === placeFilter
          : true
        : true) &&
      (isRangeFilterActive
        ? rangeFilter
          ? product.Range === rangeFilter
          : true
        : true)
    );
  });

  return (
    <div>
      <FormControl component='fieldset'>
        <FormLabel component='legend'>タイプでフィルター</FormLabel>
        <RadioGroup
          row
          name='type-filter'
          value={typeFilter}
          onChange={handleTypeChange}
        >
          <FormControlLabel value='野菜' control={<Radio />} label='野菜' />
          <FormControlLabel value='肉' control={<Radio />} label='肉' />
          <FormControlLabel value='魚' control={<Radio />} label='魚' />
          <FormControlLabel value='' control={<Radio />} label='すべて' />
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth>
        <FormLabel component='legend'>場所でフィルター</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={isPlaceFilterActive}
              onChange={handlePlaceFilterActivation}
            />
          }
          label=''
        />
        <Select
          value={placeFilter}
          onChange={handlePlaceChange}
          displayEmpty
          disabled={!isPlaceFilterActive}
        >
          <MenuItem value=''>
            <em>すべて</em>
          </MenuItem>
          {uniquePlaces.map((place) => (
            <MenuItem key={place} value={place}>
              {place}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <FormLabel component='legend'>レンジでフィルター</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={isRangeFilterActive}
              onChange={handleRangeFilterActivation}
            />
          }
          label=''
        />
        <Select
          value={rangeFilter}
          onChange={handleRangeChange}
          displayEmpty
          disabled={!isRangeFilterActive}
        >
          <MenuItem value=''>
            <em>すべて</em>
          </MenuItem>
          {uniqueRanges.map((range) => (
            <MenuItem key={range} value={range}>
              {range}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <List>
        {filteredProducts.map((product, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={product.Name}
              secondary={`タイプ: ${product.Type}, 場所: ${product.Place}, レンジ: ${product.Range}, 価格: ¥${product.Price}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default FilterComponent;
