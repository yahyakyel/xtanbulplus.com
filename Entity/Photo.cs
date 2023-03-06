using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Photo : BaseEntity
    {
        public string Name { get; set; }
        public int RealEstateId { get; set; }
    }
}
