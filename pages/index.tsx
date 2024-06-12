import axios from "axios";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

export default function Home() {
  enum STATION {
    'TAIPEI'= 466920,
    'TAINAN' = 467410,
    'TAICHUNG' = 467490
  }
  enum CITY {
    'TAIPEI'= '台北',
    'TAINAN' = '台南',
    'TAICHUNG' = '台中'
  }
  interface IData {
    id: string,
    date: number,
    temperature: string,
    station: number
  }
  
  const [station, setStation] = useState<string>('TAIPEI')
  const [data, setData] = useState<IData[]>()
  const [isLoading, setIsLoading] = useState(false)
  const callAPI = async ({ station }: { station: number }) => {
    try {
      setIsLoading(isLoading => !isLoading)
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/getData`, { station } )
      setData(res.data.data)
      setIsLoading(isLoading => !isLoading)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAPI({station: STATION[station]})
  }, [])
  return (
    <div className="h-screen flex flex-col p-4 gap-3">
      <div className="flex gap-2 p-1 items-center">
         <select onChange={event => setStation(event.target.value)} className="border rounded-lg p-2">
            <option value={'TAIPEI'}>台北</option>
            <option value={'TAICHUNG'}>台中</option>
            <option value={'TAINAN'}>台南</option>
         </select>
         {isLoading ? <ReactLoading type="spinningBubbles" color="black" height={25} width={25} /> : <button className="" onClick={() => callAPI({station: STATION[station]})}>查詢</button>}
      </div>
      <div>
        總數: {data?.length}
      </div>
      <div className="flex-1 gap-1 flex flex-col border rounded-lg p-2 bg-gray-100">
        <div className="flex flex-row justify-around text-xl font-bold p-2 gap-3">
          <div className="flex-1 bg-gray-300 rounded-lg text-center p-2">日期</div>
          <div className="flex-1 bg-gray-300 rounded-lg text-center p-2">城市</div>
          <div className="flex-1 bg-gray-300 rounded-lg text-center p-2">測站</div>
          <div className="flex-1 bg-gray-300 rounded-lg text-center p-2">溫度</div>
        </div>
        {isLoading && <ReactLoading className="self-center" color="black" width={50} height={50} />}
        {data?.map(temp => {
          return (
            <div className="flex flex-row rounded-lg bg-gray-200 p-2 justify-around" key={temp.id}>
              <div>{temp.date}</div>
              <div>{CITY[STATION[temp.station]]}</div>
              <div>{temp.station}</div>
              <div>{temp.temperature}</div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
