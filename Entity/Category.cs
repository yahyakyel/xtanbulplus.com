﻿using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public int MainCategory { get; set; }
    }
}
