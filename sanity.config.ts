import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

export default defineConfig({
  name: "default",
  title: "Duja Brand Studio",
  projectId: "hqniptmy",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: [
      {
        name: "blouse",
        title: "Blouses",
        type: "document",
        fields: [
          { name: "name", title: "Blouse Name", type: "string" },
          { name: "price", title: "Price (EGP)", type: "number" },
          {
            name: "image",
            title: "Blouse Image",
            type: "image",
            options: { hotspot: true },
          },
          { name: "description", title: "Description", type: "text" },
          {
            name: "inStock",
            title: "In Stock?",
            type: "boolean",
            initialValue: true,
          },
        ],
      },
    ],
  },
});
