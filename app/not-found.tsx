import { Link } from "lucide-react";
export default function Notfound() {
  return (
    <div className="min-h-[80vh] sm:min-h-screen flex items-center justify-center flex-col">
      <Link size={60} className="text-primary mb-8" />
      <h1 className="text-2xl sm:text-4xl font-bold ">
        Cette page n&apos;existe pas{" "}
      </h1>
      <p className="mt-5 text-center">
        Elle est peut-être en construction <br />
        veuillez rétourner à la page{" "}
        <span className="bg-primary px-2 dark:text-secondary dark:font-bold text-zinc-50 rounded-sm">
          d&apos;accueil
        </span>
      </p>
    </div>
  );
}
