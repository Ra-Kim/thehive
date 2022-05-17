import { authPaths } from "../utils/sitemap/auth";
const Sitemap = () => {
  return null;
};

const auth = authPaths();
export const getServerSideProps = async ({ res }) => {
  // const BASE_URL = "https://thehive-ruby.vercel.app/";

  // const staticPaths = fs
  //   .readdirSync(
  //     {
  //       development: "pages",
  //       production: "./pages",
  //     }[process.env.NODE_ENV]
  //   )
  //   .filter((staticPage) => {
  //     return !["_app.js", "_document.js", "sitemap.xml.js"].includes(
  //       staticPage
  //     );
  //   })
  //   .map((staticPagePath) => {
  //     return `${BASE_URL}/${staticPagePath}`;
  //   });
  // console.log(staticPaths, "staticPaths");
  const allPaths = [...auth];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${allPaths
       .map((url) => {
         return `
           <url>
             <loc>${url}</loc>
             <lastmod>${new Date().toISOString()}</lastmod>
             <changefreq>monthly</changefreq>
             <priority>1.0</priority>
           </url>
         `;
       })
       .join("")}
   </urlset>
 `;

  res.setHeader("Content-Type", "Text/xml");
  res.write(sitemap);
  res.end();
  return {
    props: {},
  };
};
export default Sitemap;
