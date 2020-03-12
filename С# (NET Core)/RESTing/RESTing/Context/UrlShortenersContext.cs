using Microsoft.EntityFrameworkCore;
using RESTing.Models;

namespace RESTing.Context
{
    public sealed class UrlShortenersContext : DbContext
    {
        public DbSet<UrlShortener> UrlShorteners { get; set; }

        public UrlShortenersContext(DbContextOptions<UrlShortenersContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("public");
            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) 
            => optionsBuilder.UseNpgsql("Host=localhost;Database=test_db;Username=me;Password=123");
    }
}