import { useEffect, useState } from "react";

function UseInfo(currency) {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(
      `https://v6.exchangerate-api.com/v6/951cfa22757af9794ed0b2d6/latest/${currency}`,
    )
      .then((res) => res.json())
      .then((res) => setData(res["conversion_rates"]));
  }, [currency]);
  return data;
}

export default UseInfo;
