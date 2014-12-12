using Orchard.UI.Resources;

namespace rtpDesign.StaticMap
{
    public class ResourceManifest : IResourceManifestProvider
    {
        public void BuildManifests(ResourceManifestBuilder builder)
        {
            var manifest = builder.Add();
            manifest.DefineScript("GoogleMapsApi")
                .SetCdn("http://maps.googleapis.com/maps/api/js?sensor=false&libraries=places");

            manifest.DefineScript("jQuery_Geocomplete")
                .SetUrl("jquery.geocomplete.min.js", "jquery.geocomplete.js")
                .SetVersion("1.6.4")
                .SetDependencies("GoogleMapsApi","jQuery");

            manifest.DefineScript("rtpDesign_StaticMap_Admin")
                .SetUrl("rtpDesignStaticMapAdmin.js")
                .SetDependencies("jQuery_Geocomplete");

            manifest.DefineStyle("rtpDesign_StaticMap_Admin")
                .SetUrl("rtpDesignStaticMapAdmin.css");
        }
    }
}