import { type MetadataRoute } from "next";
const publicUrl = "https://staging.contourexpeditions.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/private", "/dashboard", "/admin-dashboard", "/api", "/scripts", "/server", "/_next", "/static"],
    },
    sitemap: publicUrl + "/sitemap.xml",
  };
}
