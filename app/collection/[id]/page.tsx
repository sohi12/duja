import Link from "next/link";
import { createClient } from "next-sanity";

export const dynamic = "force-dynamic";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "hqniptmy",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

interface BlouseItem {
  _id: string;
  name: string;
  price: string;
  description?: string;
  inStock?: boolean;
}

export default async function BlouseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let blouses: BlouseItem[] = [];
  let blouse: BlouseItem | null = null;

  try {
    blouses = await client.fetch(
      `*[_type == "blouse"]{
        _id,
        name,
        price,
        description,
        inStock
      }`,
    );
    blouse = blouses.find((b) => b._id === id) || null;
  } catch (error) {
    console.error("Error fetching blouse details:", error);
  }

  // مصفوفة الصور المحلية
  const localProducts = [
    "/products/1.jpeg",
    "/products/2.jpeg",
    "/products/3.jpeg",
  ];

  // معرفة ترتيب البلوزة عشان نعرض نفس الصورة المحددة
  const blouseIndex = blouses.findIndex((b) => b._id === id);
  const imageSrc =
    blouseIndex !== -1
      ? localProducts[blouseIndex % localProducts.length]
      : localProducts[0];

  if (!blouse) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-[#2a2c24]">
          Blouse Not Found
        </h2>
        <Link
          href="/collection"
          className="text-xs uppercase tracking-wider font-bold text-[#6b705c] underline"
        >
          Back to Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <Link
        href="/collection"
        className="text-xs font-bold uppercase tracking-wider text-[#6b705c] hover:underline inline-block"
      >
        ← Back to Collection
      </Link>

      <div className="grid md:grid-cols-2 gap-8 items-start bg-[#f2efe9]/40 p-6 rounded-3xl border border-[#e2ded5]">
        <img
          src={imageSrc}
          alt={blouse.name}
          className="w-full h-96 object-cover rounded-2xl"
        />

        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider font-bold text-[#6b705c]">
              Pure Linen Blouse
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#2a2c24]">
              {blouse.name}
            </h1>
            <p className="text-xl font-bold text-[#3f4236]">
              {blouse.price} EGP
            </p>
          </div>

          <p className="text-xs text-[#3f4236]/80 leading-relaxed">
            {blouse.description ||
              "Handcrafted minimal blouse made with natural organic linen for maximal comfort and effortless everyday luxury."}
          </p>

          <div className="space-y-3 pt-4 border-t border-[#e2ded5]">
            <p className="text-xs font-bold text-[#2a2c24]">Payment Method:</p>
            <div className="flex gap-3 text-xs font-medium text-[#3f4236]">
              <span className="px-3 py-1.5 bg-[#e2ded5] rounded-lg">
                💵 Cash on Delivery
              </span>
              <span className="px-3 py-1.5 bg-[#e2ded5] rounded-lg">
                📱 InstaPay
              </span>
            </div>
          </div>

          <Link
            href={`/checkout?product=${encodeURIComponent(
              blouse.name,
            )}&price=${blouse.price}`}
            className="w-full bg-[#2a2c24] text-[#f4f1de] py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#3f4236] transition block text-center"
          >
            Order Now (Cash / InstaPay)
          </Link>
        </div>
      </div>
    </div>
  );
}
