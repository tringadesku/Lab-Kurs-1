using System;
using System.Collections.Generic;

namespace Hospital_Management_System.Models
{
    public partial class HyrjeDalje
    {
        public int IdStafi { get; set; }
        public DateTime? Hyrje { get; set; }
        public DateTime? Dalje { get; set; }

        public virtual User IdStafiNavigation { get; set; } = null!;
    }
}
