using Api.Entities;

namespace Api.Servises
{
    public interface ITemplateService
    {
        Task<List<Template>> GetAllAsync();
        Task<Template?> GetAsync(int id);
        Task<Template> CreateAsync(Template template);
        Task<Template?> UpdateAsync(int id, Template template);
        Task<bool> DeleteAsync(int id);

        Task<(byte[] pdf, string? error)> GeneratePdfAsync(int id, Dictionary<string, string> data);
    }
}
