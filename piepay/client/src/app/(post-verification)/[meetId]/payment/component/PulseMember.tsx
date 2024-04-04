export default function PulseMember() {
  return (

      <div className="animate-pulse flex space-x-4 bg-white p-3 rounded-2xl mb-3">
        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-200 rounded"></div>
          <div className="space-y-3">

            <div className="h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>


  );
}