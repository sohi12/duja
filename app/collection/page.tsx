import Link from "next/link";

// منتجات مؤقتة للعرض السريع أمام أصحابك
const dummyBlouses = [
  {
    _id: "1",
    name: "Classic Sand Linen Blouse",
    price: "1,200",
    imageUrl: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=800&auto=format&fit=crop",
    inStock: true,
  },
  {
    _id: "2",
    name: "Minimalist Cream Cotton Blouse",
    price: "950",
    imageUrl: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=800&auto=format&fit=crop",
    inStock: true,
  },
  {
    _id: "3",
    name: "Oversized Olive Blouse",
    price: "1,100",
    imageUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
    inStock: false,
  },
];

export default function CollectionPage() {
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

      <div className="grid md:grid-cols-3 gap-6 text-left">
        {dummyBlouses.map((blouse) => (
          <div
            key={blouse._id}
            className="bg-[#f2efe9]/60 rounded-2xl border border-[#e2ded5] overflow-hidden space-y-3 p-3 transition hover:shadow-md relative"
          >
            <Link href="#">
              <img
                src={blouse.imageUrl}
                alt={blouse.name}
                className="w-full h-72 object-cover rounded-xl"
              />
            </Link>

            <div className="px-1 space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#6b705c]">
                Blouse
              </span>
              <h3 className="font-serif font-bold text-sm text-[#2a2c24]">
                {blouse.name}
              </h3>
              <p className="font-bold text-xs text-[#3f4236]">{blouse.price} EGP</p>
            </div>

            {blouse.inStock ? (
              <button className="w-full bg-[#2a2c24] text-[#f4f1de] py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#3f4236] transition block text-center">
                View Details
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-gray-300 text-gray-500 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-not-allowed text-center"
              >
                Out of Stock
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}