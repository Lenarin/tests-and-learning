using Microsoft.EntityFrameworkCore;
using RESTing.Models;

namespace RESTing.Context
{
    public sealed class NotesContext : DbContext
    {
        public DbSet<Note> Notes { get; set; }

        public NotesContext(DbContextOptions<NotesContext> options) : base(options)
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