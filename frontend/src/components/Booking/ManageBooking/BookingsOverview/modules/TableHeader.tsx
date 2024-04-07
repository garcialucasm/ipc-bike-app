function TableHeader() {
  return (
    <>
      <thead className="bg-blue-800 text-xs uppercase text-slate-100">
        <tr>
          <th scope="col" className="py-3 px-2 text-center">
            <span className="hidden md:block">Status</span>
          </th>
          <th scope="col" className="py-3 px-2">
            User
          </th>
          <th scope="col" className="py-3 px-2">
            Bikes
          </th>
          <th scope="col" className="py-3 px-2">
            <span className="hidden md:block">Created</span>
          </th>
          <th scope="col" className="py-3 px-2 text-center">
            Actions
          </th>
        </tr>
      </thead>
    </>
  )
}

export default TableHeader
