﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.WebCollection
{
    public class TagKeyDto
    {
        public long Id { get; set; }

        public string? Title { get; set; }

        public long? ParentId { get; set; }
    }
}
