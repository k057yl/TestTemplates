using Api.Data;
using Api.Entities;
using Microsoft.EntityFrameworkCore;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System.Text.RegularExpressions;

namespace Api.Servises
{
    public class TemplateService : ITemplateService
    {
        private readonly AppDbContext _db;

        public TemplateService(AppDbContext db) => _db = db;

        public async Task<List<Template>> GetAllAsync() => await _db.Templates.ToListAsync();
        public async Task<Template?> GetAsync(int id) => await _db.Templates.FindAsync(id);
        public async Task<Template> CreateAsync(Template t) { _db.Templates.Add(t); await _db.SaveChangesAsync(); return t; }
        public async Task<Template?> UpdateAsync(int id, Template t)
        {
            var temp = await _db.Templates.FindAsync(id);
            if (temp == null) return null;
            temp.Name = t.Name;
            temp.HtmlContent = t.HtmlContent;
            await _db.SaveChangesAsync();
            return temp;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var temp = await _db.Templates.FindAsync(id);
            if (temp == null) return false;
            _db.Templates.Remove(temp);
            await _db.SaveChangesAsync();
            return true;
        }

        private static HashSet<string> ExtractPlaceholders(string html)
        {
            var rx = new Regex(@"\{\{\s*(\w+)\s*\}\}");
            return new HashSet<string>(rx.Matches(html).Select(m => m.Groups[1].Value), StringComparer.OrdinalIgnoreCase);
        }

        public async Task<(byte[] pdf, string? error)> GeneratePdfAsync(int id, Dictionary<string, string> data)
        {
            var t = await _db.Templates.FindAsync(id);
            if (t == null) return (Array.Empty<byte>(), "Template not found");

            var keys = ExtractPlaceholders(t.HtmlContent);
            var missing = keys.Where(k => !data.ContainsKey(k)).ToArray();
            if (missing.Any()) return (Array.Empty<byte>(), "Missing placeholders: " + string.Join(", ", missing));

            var html = t.HtmlContent;
            foreach (var kv in data) html = html.Replace("{{" + kv.Key + "}}", kv.Value);

            var pdf = Document.Create(c =>
            {
                c.Page(p =>
                {
                    p.Size(PageSizes.A4);
                    p.Margin(2, Unit.Centimetre);
                    p.PageColor(Colors.White);
                    p.DefaultTextStyle(x => x.FontSize(16));

                    p.Content().Column(col =>
                    {
                        col.Item().Text(t.Name).Bold().FontSize(20);
                        col.Item().Text(html);
                        col.Item().Text($"Generated at {DateTime.Now}");
                    });
                });
            }).GeneratePdf();

            return (pdf, null);
        }
    }
}
