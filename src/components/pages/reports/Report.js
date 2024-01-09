const Report = ({ data, headers }) => {
  return (
    <table>
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
