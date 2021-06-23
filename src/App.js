import { useState } from "react";
import MvpCard from "./components/MvpCard";
import { Table, TD, TH } from "./components/MvpCard/styles";

function App() {
  const [mvps, setMvps] = useState([]);
  const [mvpname, setMvpName] = useState("");
  const handleAdd = (mvp) => {
    setMvps([...mvps, mvp]);
  };
  return (
    <Table>
      <tr>
        <TH>Nome</TH>
        <TH>Tempo</TH>
        <TH>Respawn</TH>
      </tr>
      {mvps.map((e) => {
        return <MvpCard mvpName={e.name} />;
      })}
      <tr>
        <TD>
          <input value={mvpname} onChange={(e) => setMvpName(e.target.value)} />
        </TD>
        <TD>
          <button onClick={() => handleAdd({ name: mvpname })}>ADD</button>
        </TD>
      </tr>
    </Table>
  );
}

export default App;
