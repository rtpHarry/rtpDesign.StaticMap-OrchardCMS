using Orchard.ContentManagement.Records;

namespace rtpDesign.StaticMap.Models
{
    public class StaticMapPartRecord : ContentPartRecord
    {
        public virtual bool Visible { get; set; }
        public virtual double Latitude { get; set; }
        public virtual double Longitude { get; set; }
        public virtual int ZoomLevel { get; set; }
    }
}