import Button from "../button/Button";

export default function TecnicasCard() {
  return (
    <article className="max-w-xs bg-slate-100 p-4 shadow-md">
      <div className="flex items-center justify-center p-2">
        <img
          className="h-36 w-36 rounded-full border-4 border-slate-300 object-cover"
          src="/images/stones.png"
          alt="tecnicas image"
        />
      </div>
      <h3 className="mb-2 text-lg font-bold text-teal-700">Nombre Tecnica</h3>
      <p className="mb-8 text-sm text-slate-900">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. A non faucibus
        ut urna lacus quam. Senectus nascetur aliquet nulla id...
      </p>
      <Button title="Seguir Leyendo" small />
    </article>
  );
}
