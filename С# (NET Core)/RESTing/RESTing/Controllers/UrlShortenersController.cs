using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RESTing.Context;
using RESTing.Models;

namespace RESTing.Controllers_
{
    [Route("api/[controller]")]
    [ApiController]
    public class UrlShortenersController : ControllerBase
    {
        private readonly UrlShortenersContext _context;

        public UrlShortenersController(UrlShortenersContext context)
        {
            _context = context;
        }

        // GET: api/UrlShorteners
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UrlShortener>>> GetUrlShorteners()
        {
            return await _context.UrlShorteners.ToListAsync();
        }

        // GET: api/UrlShorteners/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UrlShortener>> GetUrlShortener(int id)
        {
            var urlShortener = await _context.UrlShorteners.FindAsync(id);

            if (urlShortener == null)
            {
                return NotFound();
            }

            return Redirect($"https://{urlShortener.OriginalUrl}");
        }

        // PUT: api/UrlShorteners/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUrlShortener(int id, UrlShortener urlShortener)
        {
            if (id != urlShortener.Id)
            {
                return BadRequest();
            }

            _context.Entry(urlShortener).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UrlShortenerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UrlShorteners
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<UrlShortener>> PostUrlShortener(UrlShortener urlShortener)
        {
            _context.UrlShorteners.Add(urlShortener);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUrlShortener", new { id = urlShortener.Id }, urlShortener);
        }

        // DELETE: api/UrlShorteners/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UrlShortener>> DeleteUrlShortener(int id)
        {
            var urlShortener = await _context.UrlShorteners.FindAsync(id);
            if (urlShortener == null)
            {
                return NotFound();
            }

            _context.UrlShorteners.Remove(urlShortener);
            await _context.SaveChangesAsync();

            return urlShortener;
        }

        private bool UrlShortenerExists(int id)
        {
            return _context.UrlShorteners.Any(e => e.Id == id);
        }
    }
}
