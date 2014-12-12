using rtpDesign.StaticMap.Models;
using Orchard.ContentManagement;
using Orchard.ContentManagement.Drivers;

namespace rtpDesign.StaticMap.Drivers
{
    public class MapDriver : ContentPartDriver<StaticMapPart>
    {
        protected override DriverResult Display(StaticMapPart part, string displayType, dynamic shapeHelper)
        {

            return ContentShape("Parts_StaticMap", () => shapeHelper.Parts_StaticMap(
                Visible: part.Visible, 
                Longitude: part.Longitude,
                Latitude: part.Latitude,
                ZoomLevel: part.ZoomLevel));
        }

        //GET
        protected override DriverResult Editor(StaticMapPart part, dynamic shapeHelper)
        {
            return ContentShape("Parts_StaticMap_Edit",
                () => shapeHelper.EditorTemplate(
                    TemplateName: "Parts/StaticMap",
                    Model: part,
                    Prefix: Prefix));
        }

        //POST
        protected override DriverResult Editor(StaticMapPart part, IUpdateModel updater, dynamic shapeHelper)
        {
            updater.TryUpdateModel(part, Prefix, null, null);
            return Editor(part, shapeHelper);
        }
    }
}