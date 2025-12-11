const StudyList = ({records, onClickDelete, onClickAdd}) => {
    return (
        <>
            <ul>
                {
                records.map((record, index) => {
                    return (
                    <>
                    <li key={record.id}>{record.title} {record.time}時間</li>
                    <button onClick={() => onClickDelete(record.id)}>削除</button>
                    </>
                    );
                })
                }
            </ul>
            <button onClick={onClickAdd}>登録</button>
        </>
    )
};

export default StudyList;