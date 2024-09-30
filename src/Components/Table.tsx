interface IProps {
  headings: string[];
  data: string[];
  className: string;
}

function Table({ headings, data, className }: IProps) {
  return (
    <table className={`table ${className}`}>
      <thead>
        <tr>
          {headings.map((heading: string, i: number) => (
            <th key={i}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {data.map((data: string, i: number) => (
            <td key={i}>{data}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
