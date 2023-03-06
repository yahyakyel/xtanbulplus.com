using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class City:BaseEntity
    {
        public int CityLine { get; set; }
        public string CityName { get; set; }
        public int CityKey { get; set; }
    }
}
