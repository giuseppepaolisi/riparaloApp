import 'bootstrap/dist/css/bootstrap.min.css';

function DashboardPartner() {
  return (
    <div className="container">
      <h1>Dashboard</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID Ticket</th>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Marca</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John</td>
            <td>Doe</td>
            <td>Apple</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jane</td>
            <td>Smith</td>
            <td>Samsung</td>
          </tr>
          {/* Aggiungi altre righe per altri ticket */}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardPartner;
