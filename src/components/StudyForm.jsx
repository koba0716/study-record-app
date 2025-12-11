const StudyForm = ({form, onChange, error}) => {
    return (
        <>
            <div>
                学習内容
                <input type="text" 
                name='title'
                value={form.title} onChange={onChange}/>
            </div>

            <div>
                学習時間
                <input type="number" name='time' value={form.time} onChange={onChange}/>時間
            </div>

            <p>入力されている学習内容: {form.title}</p>
            <p>入力されている学習時間: {form.time}</p>
            <p style={{color:"red"}}>{error}</p>
            
        </>
    );
};

export default StudyForm;