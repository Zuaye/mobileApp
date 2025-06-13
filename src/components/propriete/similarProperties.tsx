import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { properties } from "@/src/lib/data/propriete";
import type { propertyType } from "@/src/types/globalTypes";

interface SimilarPropertiesProps {
  property: propertyType;
}

export const SimilarProperties = ({ property }: SimilarPropertiesProps) => {
  console.log("Current property:", property);

  const similarProperties = properties.filter(
    (p) => p.id !== property.id && p.type === property.type
  );

  console.log("Similar properties found:", similarProperties);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-16"
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        Propriétés similaires{" "}
        {similarProperties.length === 0 &&
          "(Aucune propriété similaire trouvée)"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {similarProperties.slice(0, 4).map((similarProperty, index) => (
          <motion.div
            key={similarProperty.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.1 * index },
            }}
            whileHover={{ y: -10 }}
            className="group"
          >
            <Link
              href={`/property/${similarProperty.id}`}
              className="block hover:scale-105 transition-transform duration-300"
            >
              <div className="relative overflow-hidden rounded-xl bg-slate-800">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={similarProperty.images[0] || "/placeholder.svg"}
                    alt={similarProperty.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <div className="absolute top-3 right-3 bg-yellow-500 text-slate-900 font-bold px-3 py-1 rounded-full text-sm">
                    {typeof similarProperty.price === "number"
                      ? similarProperty.price.toLocaleString() + " $"
                      : similarProperty.price}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-yellow-500 transition-colors">
                    {similarProperty.title}
                  </h3>

                  <div className="flex items-center text-slate-400 mb-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span className="text-xs">{similarProperty.location}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">
                      {similarProperty.size}
                    </span>
                    <Badge
                      variant="outline"
                      className="border-yellow-500 text-yellow-500"
                    >
                      {similarProperty.type}
                    </Badge>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
