using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Neighbourhood : BaseEntity
    {
        public int NeighbourhoodLine { get; set; }
        public string NeighbourhoodName { get; set; }
        public int NeighbourhoodKey { get; set; }
        public int NeighbourhoodDistrictKey { get; set; }
    }
}
