using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RESTing.Models
{
    [Table("UrlShortener")]
    public class UrlShortener
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string OriginalUrl { get; set; }
    }
}
