using System;
using System.Collections.Generic;

namespace Hospital_Management_System.Models
{
    public partial class ActivityLogUser
    {
        public int Id { get; set; }
        public string? UseriLoggedId { get; set; }
        public string? UseriLoggedName { get; set; }
        public string? Activity { get; set; }
        public string? ActivityOn { get; set; }
        public DateTime? Ora { get; set; }
    }
}
