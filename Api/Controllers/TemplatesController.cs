using Api.Entities;
using Api.Servises;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TemplatesController : ControllerBase
    {
        private readonly ITemplateService _service;

        public TemplatesController(ITemplateService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var templates = await _service.GetAllAsync();
            return Ok(templates);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var template = await _service.GetAsync(id);
            if (template == null)
            {
                return NotFound();
            }
            return Ok(template);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Template t)
        {
            var created = await _service.CreateAsync(t);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Template t)
        {
            var updated = await _service.UpdateAsync(id, t);
            if (updated == null)
            {
                return NotFound();
            }
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPost("{id}/generate")]
        public async Task<IActionResult> GeneratePdf(int id, [FromBody] Dictionary<string, string> data)
        {
            var (pdf, error) = await _service.GeneratePdfAsync(id, data);
            if (!string.IsNullOrEmpty(error))
            {
                return BadRequest(new { error });
            }
            return File(pdf, "application/pdf", $"template_{id}.pdf");
        }
    }
}