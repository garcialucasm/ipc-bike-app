function TableHeader() {
  return (
    <>
      <thead className="bg-blue-800 text-xs uppercase text-slate-100">
        <tr>
          <th scope="col" className="px-2 py-3 text-center">
            <span className="hidden md:block">Status</span>
          </th>
          <th scope="col" className="px-2 py-3">
            Name
          </th>
          <th scope="col" className="px-2 py-3">
            Email
          </th>
          <th scope="col" className="px-2 py-3">
            Type
          </th>
          <th scope="col" className="px-2 py-3 text-center">
            Actions
          </th>
        </tr>
      </thead>
    </>
  )
}

export default TableHeader
