const TotalTime = ({ records }) => {
  const sumTime = records.reduce((sum, record) => {
    return sum + Number(record.time);
  }, 0);

  return (
    <p>合計時間 : {sumTime} / 1000(h)</p>
  );
};

export default TotalTime;