import Link from "next/link";
import { createClient } from "next-sanity";

export const dynamic = "force-dynamic";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "hqniptmy",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

export default async function CollectionPage() {
  let blouses = [];

  try {
    blouses = await client.fetch(`*[_type == "blouse"]{
      _id,
      name,
      price,
      inStock
    }`);
  } catch (error) {
    console.error("Error fetching blouses from Sanity:", error);
  }

  // صورك المحفوظة في public/products
  const localProducts = [
    "/products/1.jpeg",
    "/products/2.jpeg",
    "/products/3.jpeg",
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 pt-8 pb-16 space-y-8 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2a2c24]">
          The Blouse Collection
        </h1>
        <p className="text-xs text-[#3f4236]/70">
          Pure linen & organic cotton blouses designed for everyday ease.
        </p>
      </div>

      {blouses.length === 0 ? (
        <p className="text-sm text-gray-500 py-12">
          No blouses found in the collection yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 text-left">
          {blouses.map((blouse: any, index: number) => {
            const imageSrc = localProducts[index % localProducts.length];

            return (
              <div
                key={blouse._id}
                className="bg-[#f2efe9]/60 rounded-2xl border border-[#e2ded5] overflow-hidden space-y-3 p-3 transition hover:shadow-md relative flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <Link href={`/collection/${blouse._id}`}>
                    <img
                      src={imageSrc}
                      alt={blouse.name || "Blouse"}
                      className="w-full h-72 object-cover rounded-xl"
                    />
                  </Link>

                  <div className="px-1 space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#6b705c]">
                      Blouse
                    </span>
                    <Link href={`/collection/${blouse._id}`}>
                      <h3 className="font-serif font-bold text-sm text-[#2a2c24] hover:text-[#6b705c] transition">
                        {blouse.name}
                      </h3>
                    </Link>
                    <p className="font-bold text-xs text-[#3f4236]">
                      {blouse.price} EGP
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  {blouse.inStock ? (
                    <Link
                      href={`/collection/${blouse._id}`}
                      className="w-full bg-[#2a2c24] text-[#f4f1de] py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#3f4236] transition block text-center"
                    >
                      Add to Bag
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-300 text-gray-500 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-not-allowed text-center"
                    >
                      Out of Stock
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
