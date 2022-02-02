import * as icons from "@sanity/icons";
import camelcase from "camelcase";
import { useState } from "react";
import "./App.css";

console.log("icons", icons);

const regscape = (s) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"); // eslint-disable-line
/**
 * @param {string} query - query to look for
 * @param {Object} collection - the object to search in
 * @param {...any} keys - the keys to look at in the object
 */
const regex = (query, value) => new RegExp(regscape(query), "gi").test(value);

function App() {
  const [query, setQuery] = useState();
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ width: "100%", padding: '1rem' }}>
          <input
            style={{ width: "100%", height: '48px', padding: '0 1rem', borderRadius: 4, boxSizing: 'border-box' }}
            placeholder="Search for icon"
            onChange={({ target: { value } }) => {
              setQuery(value);
            }}
          />
        </div>
        {Object.keys(icons.icons)
          .filter((iconName) => {
            if (!query || query.length === 0) {
              return true;
            }
            return regex(query, camelcase(iconName));
          })
          .map((key) => ({ name: key, Component: icons.icons[key] }))
          .map(({ name, Component }) => {
            return (
              <div style={{ padding: "1rem" }} key={name}>
                <h5 style={{ margin: 0, textTransform: 'capitalize' }}>{camelcase(name)}</h5>
                <Component style={{ fontSize: 24 }} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
