using System.Web;
using System.Web.Optimization;

namespace ngLMS
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/node_modules/jquery/dist/jquery.js",
                        "~/node_modules/chart.js/dist/chart.js",
                         "~/node_modules/quill/dist/quill.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/node_modules/bootstrap/dist/js/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/node_modules/bootstrap/dist/css/bootstrap.css",
                      "~/node_modules/ag-grid/dist/styles/ag-grid.css",
                      "~/node_modules/ag-grid/dist/styles/ag-theme-blue.css",
                      "~/node_modules/font-awesome/css/font-awesome.min.css",
                      "~/node_modules/primeng/resources/themes/omega/theme.css",
                      "~/node_modules/primeng/resources/primeng.min.css",
                      "~/node_modules/quill/dist/quill.core.css",
                       "~/node_modules/quill/dist/quill.snow.css"));
        }
    }
}
