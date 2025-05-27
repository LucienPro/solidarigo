import { AddAssociationForm } from "../_components/AddAssociationForm";
import { AddProductForm } from "~/app/_components/AddProductForm";
import { ProductList } from "../_components/ProductList";
import { AssociationList} from "../_components/AssociationList";


export default function AdminPage() {
  
  return (
    
    <main className="p-8 text-black">
      
      

      <h1 className="text-3xl font-bold mb-6">🛠️ Interface d&apos;administration</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Gestion des associations</h2>
        <AddAssociationForm isAdmin />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">📋 Liste des associations</h2>
        <AssociationList isAdmin={true} />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🛒 Gestion des produits</h2>
        <AddProductForm isAdmin />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">📦 Liste des produits</h2>
        <ProductList/>
      </section>
    </main>
  );
}
