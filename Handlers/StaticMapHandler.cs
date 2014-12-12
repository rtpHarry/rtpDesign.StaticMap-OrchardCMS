using rtpDesign.StaticMap.Models;
using Orchard.ContentManagement.Handlers;
using Orchard.Data;

namespace rtpDesign.StaticMap.Handlers
{
    public class StaticMapHandler : ContentHandler
    {
        public StaticMapHandler(IRepository<StaticMapPartRecord> repository)
        {
            Filters.Add(StorageFilter.For(repository));
        }
    }
}