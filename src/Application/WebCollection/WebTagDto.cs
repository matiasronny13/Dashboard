using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.WebCollection
{
    public class WebTagDto
    {
        public string Id { get; set; }

        public string? Url { get; set; }

        public string Title { get; set; }

        public int[]? Tags { get; set; }
    }
}
