using System;
using System.Collections.Generic;
using System.Data;
using rtpDesign.StaticMap.Models;
using Orchard.ContentManagement.Drivers;
using Orchard.ContentManagement.MetaData;
using Orchard.ContentManagement.MetaData.Builders;
using Orchard.Core.Contents.Extensions;
using Orchard.Data.Migration;

namespace rtpDesign.StaticMap
{
    public class Migrations : DataMigrationImpl
    {
        public int Create()
        {
            SchemaBuilder.CreateTable("StaticMapPartRecord", table => table
                .ContentPartRecord()
                .Column("Visible", DbType.Boolean)
                .Column("Latitude", DbType.Double)
                .Column("Longitude", DbType.Double)
                .Column("ZoomLevel", DbType.Int32)
            );

            ContentDefinitionManager.AlterPartDefinition(
                typeof(StaticMapPart).Name, cfg => cfg.Attachable());

            return 1;
        }        
    }
}