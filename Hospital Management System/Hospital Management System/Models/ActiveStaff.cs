using System;
using System.Collections.Generic;

namespace Hospital_Management_System.Models
{
    public partial class ActiveStaff
    {
        public int Id { get; set; }
        public string? UseriRole { get; set; }
        public string? UseriId { get; set; }
        public string? UseriName { get; set; }
        public DateTime? CheckedInTime { get; set; }
    }
}
