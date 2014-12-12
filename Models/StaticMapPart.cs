using System.ComponentModel.DataAnnotations;
using Orchard.ContentManagement;
using Orchard.ContentManagement.Records;
using System.ComponentModel;

namespace rtpDesign.StaticMap.Models
{
    public class StaticMapPart : ContentPart<StaticMapPartRecord>
    {
        [DisplayName("Show Static Map?")]
        [DefaultValue(true)]
        public bool Visible
        {
            get { return Retrieve(r => r.Visible); }
            set { Store(r => r.Visible, value); }
        }

        [Required]
        public double Latitude
        {
            get { return Retrieve(r => r.Latitude); }
            set { Store(r => r.Latitude, value); }
        }

        [Required]
        public double Longitude
        {
            get { return Retrieve(r => r.Longitude); }
            set { Store(r => r.Longitude, value); }
        }

        [Required]
        [DisplayName("Zoom Level")]
        [Range(1, 21)]
        [DefaultValue(14)]
        public int ZoomLevel
        {
            get { return Retrieve(r => r.ZoomLevel); }
            set { Store(r => r.ZoomLevel, value); }
        }
    }
}
