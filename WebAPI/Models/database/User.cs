using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAPI.Models.database
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        [MaxLength(50)]
        [Required]
        public string Username { get; set; }
        [MaxLength(128)]
        [Required]
        public string Password { get; set; }
        [MaxLength(100)]
        [Required]
        public string Firstname { get; set; }
        [MaxLength(100)]
        [Required]
        public string Lastname { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        [DataType(DataType.Date)]
        public DateTime? DateOfBirth { get; set; }
        [MaxLength(256)]
        [Required]
        public string Email { get; set; }
        [MaxLength(50)]
        public string Phone { get; set; }
        [MaxLength(50)]
        public string Mobile { get; set; }

    }
}