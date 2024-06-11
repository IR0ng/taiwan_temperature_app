
export default function Home() {
  return (
    <div className="h-screen flex flex-col p-4 gap-3">
      <div className="p-1">
        test 
        <br/>
        {process.env.NEXT_PUBLIC_API_URL}
      </div>
      <div className="flex-1 flex flex-col border rounded-lg p-2 bg-gray-100">
        test
      </div>
    </div>
  );
}
