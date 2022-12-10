export default function ComprasTable() {
  return (
    <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 ">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
          <tr>
            <th scope="col" className="py-3 px-6">
              Producto
            </th>
            <th scope="col" className="py-3 px-6">
              Fecha
            </th>
            <th scope="col" className="py-3 px-6">
              Precio
            </th>
            <th scope="col" className="py-3 px-6">
              Cobrado
            </th>
            <th scope="col" className="py-3 px-6">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b bg-white  ">
            <th
              scope="row"
              className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 "
            >
              Apple MacBook Pro 17"
            </th>
            <td className="py-4 px-6">Sliver</td>
            <td className="py-4 px-6">Laptop</td>
            <td className="py-4 px-6">$2999</td>
            <td className="py-4 px-6">
              <span className="cursor-pointer font-medium text-blue-600 hover:underline ">
                Descargar
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
