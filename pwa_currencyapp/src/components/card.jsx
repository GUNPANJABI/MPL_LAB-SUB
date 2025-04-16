import Flag from "react-world-flags";
import codeToCountry from "../data/CoutryCode.js";
import codeToCountryWithCurrencyNames from "../data/CurrencyName.js";
import codeToCountryNames from "../data/CountryName.js";
import { useSelector, useDispatch } from "react-redux";
import { setAmount, setFrom, setTo } from "../features/currency.js";

const Card = (p) => {
  const dispatch = useDispatch();
  const { name, options = [], disabledin = false } = p;

  // redux //
  let selected = disabledin
    ? useSelector((state) => state.currency.target)
    : useSelector((state) => state.currency.base);

  let flag = codeToCountry[selected.toUpperCase()];
  let currency =
    codeToCountryWithCurrencyNames[selected.toUpperCase()];

  return (
    <div className="inputBox">
      <h3>
        {name} {selected.toUpperCase()}
        <br />
        {currency}
        <br />
      </h3>
      <Flag
        className="Flag"
        code={flag.toLowerCase()}
        fallback={<span>Unknown</span>}
      />
      <h2>{flag}</h2>
      <select
        name="currency"
        id=""
        value={selected.toUpperCase()}
        onChange={(e) => {
          disabledin
            ? dispatch(setTo(e.target.value))
            : dispatch(setFrom(e.target.value));
        }}
      >
        {options.map((option) => (
          <option key={option} value={option.toUpperCase()}>
            {option} {codeToCountryNames[option.toUpperCase()]}
          </option>
        ))}
      </select>
      <input
        min={0}
        step={0.25}
        disabled={disabledin}
        type="number"
        name=""
        id="amnt"
        placeholder="Enter Amount"
        value={
          disabledin
            ? useSelector((state) => state.currency.convertedAmount)
            : useSelector((state) => state.currency.amount)
        }
        onChange={(e) => {
          dispatch(setAmount(e.target.value));
        }}
      />
    </div>
  );
};

export default Card;
