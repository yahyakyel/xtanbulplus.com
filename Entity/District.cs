using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class District : BaseEntity
    {
        public int DistrictLine { get; set; }
        public string DistrictName { get; set; }
        public int DistrictKey { get; set; }
        public int DistrictCityKey { get; set; }
    }
}
