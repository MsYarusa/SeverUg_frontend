const Report = () => {
  return (
    <table>
      <tr>
        <th>Company</th>
        <th>Contact</th>
        <th>Country</th>
      </tr>
      <tr>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Germany</td>
      </tr>
      <tr>
        <td>Centro comercial Moctezuma</td>
        <td>Francisco Chang</td>
        <td>Mexico</td>
      </tr>
      <tr>
        {headers?.map((header) => (
          <th key={header}>{header}</th>
        ))}
      </tr>
      {data?.map((row) => (
        <tr key={row}>
          {row?.map((cell) => (
            <td key={cell}>{cell}</td>
          ))}
        </tr>
      ))}
    </table>
  );
};

export default Report;
