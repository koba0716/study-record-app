import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient';
import StudyForm from './components/StudyForm';
import StudyList from './components/StudyList';
import TotalTime from './components/TotalTime';

function App() {
  const [records, setRecords] = useState([]);

  const [form, setForm] = useState({title:"", time:""});

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);


  useEffect(() => {
  const fetchRecords = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("study-record")
      .select("*");

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setRecords(data);
    setLoading(false);
  };

  fetchRecords();
}, []);
  
  let sumTime = 0;

  const handleChange = (event) => {
    const {name, value} = event.target;
    setForm((prev) => ({
      ...prev,
      [name]:value,
    }));
  };

  const onClickAdd = async () => {
    if(!form.title || !form.time) {
      setError("入力内容が不足しているか、間違っています。");
      return;
    }
    if(form.time <= 0) {
      setError("0より大きい整数を入力してください");
      return;
    }
    setError("");

    const  {data, error } = await supabase
    .from("study-record")
    .insert([{title:form.title, time: Number(form.time)}])
    .select();

    if(error) {
      console.log(error);
      setError("登録に失敗しました");
      return;
    }

    setRecords((prev) => [...prev, data[0]]);

    setForm({title:"", time:""});
  };

  const onClickDelete = async(id) => {
    const {error } = await supabase
    .from("study-record")
    .delete()
    .eq("id", id);
    if(error) {
      console.error(error);
      setError("削除に失敗しました");
      return;
    }
    
    setRecords((prev) => prev.filter((record) => record.id !== id));
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  
  return (
    <>
      <h1>学習記録一覧</h1>
      <StudyForm form={form} onChange={handleChange} error={error}/>
      <StudyList records={records} onClickDelete={onClickDelete} onClickAdd={onClickAdd}/>
      <TotalTime records={records} />
    </>
  )
}

export default App
